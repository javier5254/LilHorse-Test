export type Todo = {
  _id: string;
  name: string;
  type: [];
  priority: number;
  duration: string;
  standout: boolean;
  state: boolean;
};

export type TodoContextType = {
  todoContext: Array<Todo>;
  setTodoContext: (value: Array<Todo>) => void;
};

export interface TodoContextInterface {
    todos: Todo[],
    edit: Todo | null,
    handleAddTask: (todos: Todo) => void
    handleEditTask: (todos: Todo) => void
    handleRemoveTask: (id: string) => void
    handleUploadTask: (todos: Todo) => void
    handleSwitchState: (todos: Todo) => void
  }
  