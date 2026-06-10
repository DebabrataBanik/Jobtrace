import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { jwtVerify } from 'jose';
import mongoose from 'mongoose';

export function validateRequest(schema: z.ZodType) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issues = result.error.issues.map((issue) => ({
        name: issue.path[0]?.toString(),
        error: issue.message,
      }));
      return res.status(400).json({ message: { type: 'ZodError', issues } });
    }
    req.body = result.data;
    next();
  };
}

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

export function validateId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  next();
}
