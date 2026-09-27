import test from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { encryptBuffer, decryptBuffer, createAccessToken, verifyAccessToken, canAccessFile } from '../src/index.js';

test('encrypts and decrypts data', () => {
  const key = randomBytes(32);
  const encrypted = encryptBuffer(Buffer.from('private-file'), key);
  assert.equal(decryptBuffer(encrypted, key).toString(), 'private-file');
});

test('validates expiring signed access tokens', () => {
  const token = createAccessToken({ fileId: 'a', userId: 'u', expiresAt: Date.now() + 1000 }, 'secret');
  assert.equal(verifyAccessToken(token, 'secret').valid, true);
  assert.equal(verifyAccessToken(token, 'wrong').valid, false);
});

test('enforces owner/share access', () => {
  const file = { ownerId: 'owner', sharedWith: ['friend'] };
  assert.equal(canAccessFile(file, 'owner'), true);
  assert.equal(canAccessFile(file, 'friend'), true);
  assert.equal(canAccessFile(file, 'other'), false);
});
