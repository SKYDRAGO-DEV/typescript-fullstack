import express from 'express';
import { userRouter } from './routes/user.routes';
import { itemRouter } from './routes/item.routes';
import { errorHandler } from './middleware/error.middleware';
import { authMiddleware } from './middleware/auth.middleware';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

// Health check (public)
app.get('/api/v1/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Auth routes (public)
app.use('/api/v1/auth', userRouter);

// Protected routes
app.use('/api/v1/users', authMiddleware, userRouter);
app.use('/api/v1/items', authMiddleware, itemRouter);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 API server running on port ${PORT}`);
});

export default app;