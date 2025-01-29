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