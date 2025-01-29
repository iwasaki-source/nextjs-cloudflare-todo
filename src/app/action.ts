'use server'
// import { TodoCreate } from "@/types/todo";

export async function createTodo(formData: FormData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const completed = formData.get('completed');
  console.log(title, description, completed);
  await fetch(`${process.env.API_URL}/api/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description, completed }),
  });
}