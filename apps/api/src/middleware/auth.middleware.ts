import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: { message: 'Unauthorized', code: 'UNAUTHORIZED' } });
    return;
  }

  const token = authHeader.substring(7);
  if (!token) {
    res.status(401).json({ error: { message: 'Invalid token', code: 'INVALID_TOKEN' } });
    return;
  }

  (req as any).user = { id: '1', email: 'user@example.com' };
  next();
}