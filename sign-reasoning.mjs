#!/usr/bin/env node
/**
 * ARP Signer for Phantom Authority
 * Signs reasoning.json using Ed25519 + JCS (RFC 8785)
 * Generates keypair, signs, outputs DNS TXT record
 */

import { readFileSync, writeFileSync } from 'fs';

// Node v25+ has native globalThis.crypto — no polyfill needed

const ed = await import('@noble/ed25519');
const { sha512 } = await import('@noble/hashes/sha512');
const canonicalize = (await import('canonicalize')).default;

// CRITICAL: noble ed25519 v2 needs external SHA-512
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

// Config
const DOMAIN = 'phantomauthority.ai';
const SELECTOR = 'arp';
const INPUT_FILE = './reasoning.json';
const OUTPUT_FILE = './reasoning.json';
const KEY_FILE = `../arp_private_phantomauthority.pem`;

// Base64 helpers
const toBase64 = (bytes) => Buffer.from(bytes).toString('base64');
const toBase64Url = (bytes) => toBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

// PEM helper
function formatPEM(privKeyBytes) {
    const header = new Uint8Array([
        0x30, 0x2e, 0x02, 0x01, 0x00, 0x30, 0x05, 0x06,
        0x03, 0x2b, 0x65, 0x70, 0x04, 0x22, 0x04, 0x20
    ]);
    const pkcs8 = new Uint8Array(header.length + privKeyBytes.length);
    pkcs8.set(header);
    pkcs8.set(privKeyBytes, header.length);
    const b64 = Buffer.from(pkcs8).toString('base64');
    const lines = b64.match(/.{1,64}/g).join('\n');
    return `-----BEGIN PRIVATE KEY-----\n${lines}\n-----END PRIVATE KEY-----`;
}

// Read unsigned reasoning.json
console.log('📄 Reading', INPUT_FILE);
const rawJson = readFileSync(INPUT_FILE, 'utf-8');
const payload = JSON.parse(rawJson);

// Remove any existing signature
delete payload._arp_signature;

// Generate Ed25519 keypair
console.log('🔑 Generating Ed25519 keypair...');
const privKey = ed.utils.randomPrivateKey();
const pubKey = await ed.getPublicKeyAsync(privKey);
const pubKeyB64 = toBase64(pubKey);
const privKeyPem = formatPEM(privKey);

// JCS canonicalize (RFC 8785)
console.log('📐 JCS canonicalization (RFC 8785)...');
const canonicalString = canonicalize(payload);
const canonicalBytes = new TextEncoder().encode(canonicalString);

// Sign
console.log('✍️  Signing with Ed25519...');
const signatureBytes = await ed.signAsync(canonicalBytes, privKey);
const signatureB64Url = toBase64Url(signatureBytes);

// Build signature block
const now = new Date();
const expires = new Date();
expires.setDate(now.getDate() + 90);

payload._arp_signature = {
    algorithm: "Ed25519",
    dns_selector: SELECTOR,
    dns_record: `${SELECTOR}._arp.${DOMAIN}`,
    canonicalization: "jcs-rfc8785",
    signed_at: now.toISOString().split('.')[0] + "Z",
    expires_at: expires.toISOString().split('.')[0] + "Z",
    signature: signatureB64Url
};

// Write signed file
const signedJson = JSON.stringify(payload, null, 2);
writeFileSync(OUTPUT_FILE, signedJson + '\n');
console.log('✅ Signed reasoning.json written to', OUTPUT_FILE);

// Write private key
writeFileSync(KEY_FILE, privKeyPem + '\n');
console.log('🔐 Private key saved to', KEY_FILE);

// Output DNS record
console.log('\n' + '═'.repeat(60));
console.log('DNS TXT RECORD — Add this to Vercel DNS:');
console.log('═'.repeat(60));
console.log(`  Name:  ${SELECTOR}._arp.${DOMAIN}`);
console.log(`  Type:  TXT`);
console.log(`  Value: v=ARP1; k=ed25519; p=${pubKeyB64}`);
console.log('═'.repeat(60));
console.log(`\nSignature: ${signatureB64Url.substring(0, 40)}...`);
console.log(`Expires:   ${payload._arp_signature.expires_at}`);
