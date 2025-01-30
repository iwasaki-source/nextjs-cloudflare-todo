import { getTodo } from "@/app/action";

export default async function Edit({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const todo = await getTodo(id);

  return (
    <div>
      <h1 className='text-center text-2xl mb-6'>Todo編集</h1>
    </div>
  )
}
