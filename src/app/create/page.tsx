import Form from 'next/form';
import { createTodo } from '../action';

export default function Create() {
  return (
    <div>
      <h1 className='text-center text-2xl mb-6'>Todo作成</h1>
      <Form action={createTodo} className='flex flex-col gap-y-6 '>
        <div className='flex flex-col gap-y-4'>
          <label>タイトル</label>
          <input name="title" className='border-2 p-2' />
        </div>
        <div className='flex flex-col gap-y-2'>
          <label>内容</label>
          <textarea name="description" rows={10} className='border-2 p-2' />
        </div>
        <label className='flex gap-x-2 items-center justify-center'>
          完了
          <input name="completed" type='checkbox' className='w-4 h-4' />
        </label>
        <div className='flex justify-center mt-8'>
          <button type="submit" className='block w-full max-w-xs bg-amber-400 px-4 py-3 rounded-md text-center'>作成</button>
        </div>
      </Form>
    </div>
  );
}