const SECRET_KEY = process.env.JWT_SECRET || 'adpulse-fallback-secret-key-2026';

function bufToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function getSignature(message) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(SECRET_KEY);
  const msgData = encoder.encode(message);
  
  const key = await crypto.subtle.importKey(
    'raw', 
    keyData, 
    { name: 'HMAC', hash: 'SHA-256' }, 
    false, 
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, msgData);
  return bufToHex(signature);
}

export async function createSession(username) {
  const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const payload = JSON.stringify({ username, expires });
  const encodedPayload = btoa(payload);
  const signature = await getSignature(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export async function verifySession(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  
  const [encodedPayload, signature] = parts;
  const expectedSignature = await getSignature(encodedPayload);
  
  if (signature !== expectedSignature) return null;
  
  try {
    const decoded = JSON.parse(atob(encodedPayload));
    if (decoded.expires < Date.now()) return null; 
    return decoded;
  } catch (e) {
    return null;
  }
}
