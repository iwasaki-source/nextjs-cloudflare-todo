import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { todos } from '@/drizzle/schema';

type Bindings = {
  DB: D1Database;
};

export const runtime = 'edge';

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

// 1件取得
app.get('/todos/:id', async (c) => {
  const db = drizzle(process.env.DB);
  const id = parseInt(c.req.param('id'));
  try {
    const res = await db.select().from(todos).where(eq(todos.id, id));
    return c.json(res);
  } catch (error) {
    return c.json({ error: error }, 500);
  }
})

// 全件取得
app.get('/todos', async (c) => {
  const db = drizzle(process.env.DB);
  try {
    const res = await db.select().from(todos);
    return c.json(res);
  } catch (error) {
    return c.json({ error: error }, 500);
  }
})

// 1件削除
app.delete('/todos/:id', async (c) => {
  const db = drizzle(process.env.DB);
  const id = parseInt(c.req.param('id'));
  try {
    await db.delete(todos).where(eq(todos.id, id));
    return c.json({ message: 'Deleted' }, 200);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
})

// 新規登録
app.post('/todos', async (c) => {
  const db = drizzle(process.env.DB);
  const { title, description, completed } = await c.req.json();
  try {
    await db.insert(todos).values({
      title,
      description,
      completed,
    })
    return c.json({ message: 'Created' }, 200);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
})

// 更新
app.put('/todos/:id', async (c) => {
  const db = drizzle(process.env.DB);
  const id = parseInt(c.req.param('id'));
  const { title, description, completed } = await c.req.json();
  try {
    await db.update(todos).set({
      title,
      description,
      completed,
    }).where(eq(todos.id, id));
    return c.json({ message: 'Updated' }, 200);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
})

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PUT = handle(app);