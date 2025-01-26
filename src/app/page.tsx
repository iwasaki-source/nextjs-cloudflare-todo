import TodoTable from '@/components/TodoTable';
import { getTodos } from '@/utils/api';

export default async function Home() {
  const todos = await getTodos();
  return (
    <div className="">
      <main className="">
        <TodoTable todos={todos} />
      </main>
    </div>
  );
}