<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=210&text=SECURE%20FILE%20VAULT&fontAlignY=38&desc=ENCRYPTION%20%E2%80%A2%20ACCESS%20%E2%80%A2%20EXPIRY&descAlignY=58&color=0:050505,55:202020,100:5a1616&fontColor=f5f5f5&descColor=d4d4d4" width="100%" />

![Crypto](https://img.shields.io/badge/crypto-AES--256--GCM-111111?style=for-the-badge)
![Runtime](https://img.shields.io/badge/Node.js-20%2B-2b2b2b?style=for-the-badge&logo=nodedotjs)
![Tests](https://img.shields.io/badge/tests-node:test-7a1f1f?style=for-the-badge)

**A security-focused file-access core for encryption, ownership and expiring access links.**

</div>

---

## Core idea

The repo focuses on the rules underneath a private-file product rather than pretending storage alone makes a vault secure.

```txt
file bytes
   ↓
AES-256-GCM encryption
   ↓
owner / share policy
   ↓
signed expiring token
   ↓
authorized read
```

## Implemented

- AES-256-GCM authenticated encryption
- random IV generation
- tamper-detecting authentication tags
- HMAC-signed access tokens
- token expiry validation
- timing-safe signature comparison
- owner/shared-user access checks
- tests for encryption and authorization

## Test

```bash
npm test
```

## Security boundary

This is a focused cryptography/access-control foundation. A production service still needs durable encrypted storage, authenticated users, key management/rotation, rate limits, audit logging and strict upload validation.

## Why I built it

I wanted a project where security is part of the domain model instead of being a checkbox added after the UI exists.

---

<div align="center"><sub>YukiShinobi // private by design, not by assumption.</sub></div>
