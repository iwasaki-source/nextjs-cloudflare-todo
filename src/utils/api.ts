import type { Todo } from '@/types/todo';

export async function getTodos() {
  const res = await fetch('http://localhost:3002/api/todos');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json<Todo[]>();
}