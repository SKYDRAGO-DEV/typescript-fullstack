import { Router, Request, Response } from 'express';
import { asyncHandler } from '../utils/async';

export const itemRouter = Router();

let items = [
  { id: '1', name: 'Example Item', createdAt: new Date().toISOString() },
];

itemRouter.get('/', asyncHandler(async (_req: Request, res: Response) => {
  res.json({ data: items, meta: { page: 1, pageSize: 20, total: items.length, totalPages: 1 } });
}));

itemRouter.post('/', asyncHandler(async (req: Request, res: Response) => {
  const item = { id: String(items.length + 1), ...req.body, createdAt: new Date().toISOString() };
  items.push(item);
  res.status(201).json({ data: item });
}));

itemRouter.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: { message: 'Item not found' } });
  res.json({ data: item });
}));

itemRouter.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const idx = items.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: { message: 'Item not found' } });
  items.splice(idx, 1);
  res.status(204).send();
}));