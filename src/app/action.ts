'use server'

import { redirect } from "next/navigation";

// import { TodoCreate } from "@/types/todo";

export async function createTodo(formData: FormData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const completed = formData.get('completed');
  await fetch(`${process.env.API_URL}/api/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description, completed }),
  });
  redirect('/');
}