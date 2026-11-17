#!/usr/bin/env node
/**
 * Prints fresh values for the admin login environment variables. Run locally:
 *   node scripts/admin-security-setup.mjs
 * Then paste them into Vercel > Project > Settings > Environment Variables (Production), and redeploy.
 * Nothing is saved or sent anywhere; treat the output like a password.
 */
import crypto from 'crypto';

const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function base32(buf) {
  let bits = 0, value = 0, out = '';
  for (const byte of buf) {
    value = (value << 8) | byte; bits += 8;
    while (bits >= 5) { out += B32[(value >>> (bits - 5)) & 31]; bits -= 5; }
  }
  if (bits > 0) out += B32[(value << (5 - bits)) & 31];
  return out;
}

const words = crypto.randomBytes(18).toString('base64url'); // 24 random characters
const totp = base32(crypto.randomBytes(20));
const sessionSecret = crypto.randomBytes(48).toString('hex');
const label = encodeURIComponent('Elevate Admin');
const otpauth = `otpauth://totp/${label}?secret=${totp}&issuer=${label}&algorithm=SHA1&digits=6&period=30`;

console.log(`
ADMIN_PASSWORD=${words}
SESSION_SECRET=${sessionSecret}
ADMIN_TOTP_SECRET=${totp}

Authenticator app (Google Authenticator, Microsoft Authenticator, Authy, 1Password):
  Add account > "Enter a setup key" > name: Elevate Admin > key: ${totp} > time-based.
  Or turn this link into a QR code on a trusted device: ${otpauth}

Keep the password in a password manager. Changing SESSION_SECRET signs every device out.
`);
