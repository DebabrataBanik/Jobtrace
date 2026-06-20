import { SignJWT } from 'jose';

export async function generateToken(userId: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${process.env.JWT_EXPIRY}`)
    .sign(secret);

  return token;
}
