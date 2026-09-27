import { createCipheriv, createDecipheriv, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export function encryptBuffer(buffer, key) {
  if (!Buffer.isBuffer(buffer)) buffer = Buffer.from(buffer);
  if (!Buffer.isBuffer(key) || key.length !== 32) throw new Error('key must be a 32-byte Buffer');
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(buffer), cipher.final()]);
  const tag = cipher.getAuthTag();
  return { iv, tag, ciphertext };
}

export function decryptBuffer(payload, key) {
  const decipher = createDecipheriv('aes-256-gcm', key, payload.iv);
  decipher.setAuthTag(payload.tag);
  return Buffer.concat([decipher.update(payload.ciphertext), decipher.final()]);
}

export function createAccessToken({ fileId, userId, expiresAt }, secret) {
  const body = Buffer.from(JSON.stringify({ fileId, userId, expiresAt })).toString('base64url');
  const sig = createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function verifyAccessToken(token, secret, now = Date.now()) {
  const [body, sig] = String(token).split('.');
  if (!body || !sig) return { valid: false, reason: 'malformed' };
  const expected = createHmac('sha256', secret).update(body).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { valid: false, reason: 'signature' };
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  if (Number(payload.expiresAt) <= now) return { valid: false, reason: 'expired', payload };
  return { valid: true, payload };
}

export function canAccessFile(file, userId) {
  return file?.ownerId === userId || file?.sharedWith?.includes(userId) === true;
}
