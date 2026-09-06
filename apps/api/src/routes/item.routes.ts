import { Request, Response, Router } from 'express';

interface Item {
  id: string;
  name: string;
  createdAt: string;
}

export const itemRouter = Router();

let nextId = 2;
let items: Item[] = [
  { id: '1', name: 'Example Item', createdAt: new Date().toISOString() },
];

itemRouter.get('/', (_req: Request, res: Response): void => {
  res.json({
    data: items,
    meta: {
      page: 1,
      pageSize: items.length,
      total: items.length,
      totalPages: 1,
    },
  });
});

itemRouter.post('/', (req: Request, res: Response): void => {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';

  if (!name) {
    res.status(400).json({ error: { message: 'name is required', code: 'INVALID_INPUT' } });
    return;
  }

  const item: Item = {
    id: String(nextId),
    name,
    createdAt: new Date().toISOString(),
  };
  nextId += 1;
  items.push(item);

  res.status(201).json({ data: item });
});

itemRouter.get('/:id', (req: Request, res: Response): void => {
  const item = items.find((candidate) => candidate.id === req.params.id);

  if (!item) {
    res.status(404).json({ error: { message: 'Item not found', code: 'NOT_FOUND' } });
    return;
  }

  res.json({ data: item });
});

itemRouter.delete('/:id', (req: Request, res: Response): void => {
  const index = items.findIndex((candidate) => candidate.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: { message: 'Item not found', code: 'NOT_FOUND' } });
    return;
  }

  items.splice(index, 1);
  res.status(204).send();
});
