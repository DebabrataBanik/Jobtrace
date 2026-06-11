import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Token ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = auth.split(' ')[1];
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const { payload } = await jwtVerify(token, secret);
  req.user = { userId: payload.sub as string };

  next();
}
