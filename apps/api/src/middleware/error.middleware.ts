import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error & { errors?: string[] },
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Error:', err);

  const status = (err as any).status || 500;
  const message = err.errors?.join(', ') || err.message || 'Internal server error';

  res.status(status).json({
    error: { message, code: 'INTERNAL_ERROR' },
  });
}