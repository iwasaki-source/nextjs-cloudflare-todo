import type { Todo } from '@/types/todo';

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${process.env.API_URL}/api/todos`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}