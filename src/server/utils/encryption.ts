import crypto from 'crypto';

// Ensure this key is 32 bytes. In dev, we fallback to a default.
// In prod, this MUST be set in env vars.
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
if (!ENCRYPTION_KEY) {
    if (process.env.NODE_ENV === 'production') {
        throw new Error("ENCRYPTION_KEY must be set in production environment");
    }
    // In dev, we can use a placeholder but let's make it obviously not a secret
    // Actually, let's just use a 32-byte string that doesn't look like a key
}
const KEY = ENCRYPTION_KEY || 'development_encryption_key_32char';
const IV_LENGTH = 16;

export function encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string): string {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
