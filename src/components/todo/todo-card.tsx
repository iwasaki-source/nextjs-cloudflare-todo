import type { Todo } from "@/types/todo";
import TodoActions from "./todo-actions";

export default function TodoCard({ todo }: { todo: Todo }) {
  const { title, description, created_at, completed } = todo;

  if (!description) return null;

  const formattedDate = new Date(created_at).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="border border-black rounded-md p-4">
      <div className="flex justify-between gap-x-4 pb-2 border-b border-black">
        <h2 className="text-xl">{title}</h2>
        {completed ? (
          <p className="text-green-800 font-medium">完了</p>
        ) : (
          <p className="text-red-500 font-medium">未完了</p>
        )}
      </div>
      <div className="p-4 pb-0">
        <div className="description" dangerouslySetInnerHTML={{ __html: description || '' }} />
        <div className="flex justify-end gap-4 mt-4">
          <time className="mr-auto self-end">{formattedDate}</time>
          <TodoActions todo={todo} />
        </div>
      </div>
    </div>
  )
}