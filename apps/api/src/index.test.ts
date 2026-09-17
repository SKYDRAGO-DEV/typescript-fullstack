import assert from 'node:assert/strict';
import { once } from 'node:events';
import test from 'node:test';

import app, { resolvePort } from './index';

async function withServer(run: (baseUrl: string) => Promise<void>): Promise<void> {
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  assert.ok(address && typeof address !== 'string');

  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

test('health and item routes execute end-to-end', async () => {
  await withServer(async (baseUrl) => {
    const health = await fetch(`${baseUrl}/api/v1/health`);
    assert.equal(health.status, 200);
    const healthBody = (await health.json()) as { status: string };
    assert.equal(healthBody.status, 'healthy');

    const invalidCreate = await fetch(`${baseUrl}/api/v1/items`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: '   ' }),
    });
    assert.equal(invalidCreate.status, 400);

    const create = await fetch(`${baseUrl}/api/v1/items`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Verified Item' }),
    });
    assert.equal(create.status, 201);
    const created = (await create.json()) as { data: { id: string; name: string } };
    assert.equal(created.data.name, 'Verified Item');

    const get = await fetch(`${baseUrl}/api/v1/items/${created.data.id}`);
    assert.equal(get.status, 200);

    const remove = await fetch(`${baseUrl}/api/v1/items/${created.data.id}`, {
      method: 'DELETE',
    });
    assert.equal(remove.status, 204);

    const missing = await fetch(`${baseUrl}/api/v1/items/${created.data.id}`);
    assert.equal(missing.status, 404);
  });
});

test('resolvePort validates TCP port configuration', () => {
  assert.equal(resolvePort('3000'), 3000);
  assert.equal(resolvePort('65535'), 65535);
  assert.throws(() => resolvePort('0'), /between 1 and 65535/);
  assert.throws(() => resolvePort('65536'), /between 1 and 65535/);
  assert.throws(() => resolvePort('not-a-port'), /between 1 and 65535/);
});
