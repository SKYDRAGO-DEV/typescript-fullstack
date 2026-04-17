import { Router, Request, Response } from 'express';
import { asyncHandler } from '../utils/async';

export const userRouter = Router();

userRouter.post(
  '/register',
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password, username } = req.body;
    res.status(201).json({
      data: { id: '1', email, username },
      message: 'User created successfully',
    });
  })
);

userRouter.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    res.json({
      data: { email, token: 'jwt-token-here' },
      message: 'Login successful',
    });
  })
);

userRouter.get(
  '/me',
  asyncHandler(async (req: Request, res: Response) => {
    res.json({
      data: {
        id: '1',
        email: 'user@example.com',
        username: 'skydrago',
      },
    });
  })
);