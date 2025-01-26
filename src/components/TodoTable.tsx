import type { TodosProps } from "@/types/todo"

const TodoTable = ({ todos }: TodosProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>タイトル</th>
          <th>内容</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td>{todo.title}</td>
            <td>{todo.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TodoTable