import TodoList from '@/components/todo/todo-list';
import { getTodos } from '@/utils/api';

export default async function Home() {
  const todos = await getTodos();
  return (
    <div className="">
      <main className="max-w-4xl mx-auto mt-16">
        <TodoList todos={todos} />
      </main>
    </div>
  );
}