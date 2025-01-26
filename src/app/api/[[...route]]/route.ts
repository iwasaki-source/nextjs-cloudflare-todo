import { Hono } from 'hono';
import { handle } from 'hono/vercel';

type Bindings = {
  DB: D1Database;
};

export const runtime = 'edge';

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

// 1件取得
app.get('/todos/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const { results } = await process.env.DB.prepare(
      'SELECT * FROM todos WHERE id = ?;'
    ).bind(id).all()
    return c.json(results);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
})

// 全件取得
app.get('/todos', async (c) => {
  try {
    const { results } = await process.env.DB.prepare(
      'SELECT * FROM todos;'
    ).all()
    return c.json(results);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
})

// 1件削除
app.delete('/todos/:id', async (c) => {
  const id = c.req.param('id');
  try {
    await process.env.DB.prepare(
      'DELETE FROM todos WHERE id = ?;'
    ).bind(id).run();
    return c.json({ message: 'Deleted' }, 200);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
})

// 新規登録
app.post('/todos', async (c) => {
  const { title, content } = await c.req.json();
  try {
    await process.env.DB.prepare(
      'INSERT INTO todos (title, content) VALUES (?, ?);'
    ).bind(title, content).run();
    return c.json({ message: 'Created' }, 200);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
})

// 更新
app.put('/todos/:id', async (c) => {
  const id = c.req.param('id');
  const { title, content } = await c.req.json();
  try {
    await process.env.DB.prepare(
      'UPDATE todos SET title = ?, content = ? WHERE id = ?;'
    ).bind(title, content, id).run();
  } catch (e) {
    return c.json({ err: e }, 500);
  }
})

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PUT = handle(app);