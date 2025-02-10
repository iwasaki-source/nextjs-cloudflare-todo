'use server'

import { convertMarkdownToHtml } from "@/lib/markdown/markdown";
import { redirect } from "next/navigation";
import { CreateTodo, Todo } from "@/types/todo";

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${process.env.API_URL}/api/todos`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function getTodo(id: number): Promise<Todo> {
  const res = await fetch(`${process.env.API_URL}/api/todos/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

// Markdown変換前
// export async function createTodo({
//   title,
//   description,
//   completed
// }: CreateTodo) {
//   await fetch(`${process.env.API_URL}/api/todos`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ title, description, completed }),
//   });
//   redirect('/');
// }

export async function createTodo({
  title,
  description,
  completed
}: CreateTodo) {
  const htmlDescription = await convertMarkdownToHtml(description);

  await fetch(`${process.env.API_URL}/api/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description: htmlDescription,
      completed
    }),
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

// Markdown変換前
// export async function updateTodo(id: number, data: CreateTodo) {
//   await fetch(`${process.env.API_URL}/api/todos/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data),
//   });
//   redirect('/');
// }

export async function updateTodo(id: number, data: CreateTodo) {
  const { title, description, completed } = data;
  const htmlDescription = await convertMarkdownToHtml(description);

  await fetch(`${process.env.API_URL}/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description: htmlDescription,
      completed
    }),
  });
  redirect('/');
}