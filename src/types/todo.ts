export type Todo = {
  id: number;
  title: string;
  content: string;
};

export type TodosProps = {
  todos: Todo[];
};