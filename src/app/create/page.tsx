import Form from 'next/form';
import { createTodo } from '../action';

export default function Create() {
  return (
    <div>
      <h1 className='text-center text-2xl mb-6'>Todo作成</h1>
      <Form action={createTodo}>
        <input name="title" />
        <input name="description" />
        <input name="completed" type='checkbox'/>
        <button type="submit">作成</button>
      </Form>
    </div>
  );
}