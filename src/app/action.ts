'use server'

import { redirect } from "next/navigation";
import { CreateTodo } from "@/types/todo";

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