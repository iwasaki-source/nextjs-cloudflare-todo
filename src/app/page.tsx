import TodoList from '@/components/todo/todo-list';
import { getTodos } from '@/utils/api';
import Link from 'next/link';

export default async function Home() {
  const todos = await getTodos();
  return (
    <div className="">
      <main>
        <h1 className='text-center text-2xl mb-6'>Todoリスト一覧</h1>
        <TodoList todos={todos} />
        <Link href="/create" className="block max-w-lg mx-auto mt-8 bg-amber-400 px-4 py-2 rounded-md text-center">作成</Link>
      </main>
    </div>
  );
}