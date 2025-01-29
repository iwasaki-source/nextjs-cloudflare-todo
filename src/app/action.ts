'use server'

import { redirect } from "next/navigation";
import { CreateTodo, Todo } from "@/types/todo";

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${process.env.API_URL}/api/todos`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function createTodo({
  title,
  description,
  completed
}: CreateTodo) {
  await fetch(`${process.env.API_URL}/api/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description, completed }),
  });
  redirect('/');
}

export async function deleteTodo(id: number) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/todos/${id}`, {
      method: 'DELETE',
      next: { revalidate: 0 }
    });
    if (!res.ok) {
      throw new Error('削除に失敗しました');
    }
  } catch (error) {
    console.error(error);
  }
  redirect('/');
};