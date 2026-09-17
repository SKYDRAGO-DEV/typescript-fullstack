import { NextFunction, Request, Response } from 'express';

type ErrorWithStatus = Error & {
  status?: unknown;
  errors?: unknown;
};

function resolveStatus(error: ErrorWithStatus): number {
  if (
    typeof error.status === 'number' &&
    Number.isInteger(error.status) &&
    error.status >= 400 &&
    error.status <= 599
  ) {
    return error.status;
  }
  return 500;
}

function resolveClientMessage(error: ErrorWithStatus, status: number): string {
  if (status >= 500) {
    return 'Internal server error';
  }

  if (Array.isArray(error.errors) && error.errors.every((value) => typeof value === 'string')) {
    return error.errors.join(', ');
  }

  return error.message || 'Request failed';
}

export function errorHandler(
  err: ErrorWithStatus,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Error:', err);

  const status = resolveStatus(err);
  const message = resolveClientMessage(err, status);
  const code = status >= 500 ? 'INTERNAL_ERROR' : 'REQUEST_ERROR';

  res.status(status).json({
    error: { message, code },
  });
}
