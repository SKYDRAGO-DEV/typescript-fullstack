import express from 'express';
import { itemRouter } from './routes/item.routes';
import { errorHandler } from './middleware/error.middleware';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json({ limit: '32kb' }));

  app.get('/api/v1/health', (_req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptimeSeconds: process.uptime(),
    });
  });

  app.use('/api/v1/items', itemRouter);
  app.use(errorHandler);

  return app;
}

export function resolvePort(rawPort = process.env.PORT ?? '3000'): number {
  const port = Number(rawPort);
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }
  return port;
}

const app = createApp();

if (require.main === module) {
  const port = resolvePort();
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}

export default app;
