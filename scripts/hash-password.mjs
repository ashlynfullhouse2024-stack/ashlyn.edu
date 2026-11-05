import { createHash } from 'node:crypto';
const pw = process.argv[2];
if (!pw) { console.error('Pemakaian: npm run hash-password -- "passwordBaru"'); process.exit(1); }
console.log('VITE_ADMIN_PASSWORD_HASH=' + createHash('sha256').update(pw).digest('hex'));
