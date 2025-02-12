'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateTodo } from "@/app/action";
import { createTodoSchema } from '@/lib/validation-schema/taskSchema';
import { CreateTodo,  Todo } from '@/types/todo';
import { convertHtmlToMarkdown } from '@/lib/markdown/markdown';

export default function EditTodoForm({ todo }: { todo: Todo}) {

  const { id, title, description, completed } = todo;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTodo>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: title,
      description: convertHtmlToMarkdown(description),
      completed: completed
    }
  });

  const onSubmit = async (data: CreateTodo) => {
    await updateTodo(id, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-6 '>
      <div className='flex flex-col gap-y-4'>
        <label htmlFor='title'>タイトル</label>
        <input
          id="title"
          {...register("title")}
          className='border-2 p-2'
        />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
      </div>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='description'>内容</label>
        <textarea
          id="description"
          {...register('description')}
          rows={10}
          className='border-2 p-2'
        />
      </div>
      <label className='flex gap-x-2 items-center justify-center'>
        完了
        <input {...register('completed')} type='checkbox' className='w-4 h-4' />
      </label>
      <div className='flex justify-center mt-8'>
        <button
          type="submit"
          disabled={isSubmitting}
          className='block w-full max-w-xs bg-amber-400 px-4 py-3 rounded-md text-center'
        >
          {isSubmitting ? '更新中...' :  '更新'}
        </button>
      </div>
    </form>
  )
}