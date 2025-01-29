export type Todo = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  completed: boolean;
};

export type TodoCreate = {
  title: string;
  description: string;
  completed: boolean;
};