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

const PORT = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(PORT) || PORT <= 0 || PORT > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535');
}

const app = createApp();

app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});

export default app;
