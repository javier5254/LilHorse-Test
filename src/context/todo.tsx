import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";
import { Todo, TodoContextInterface } from "./types";

const API_URL =
  "https://crudcrud.com/api/46e364ad0fc0437bbdc5c69117d3e3c5/todolilhorse/";

const TodoContext = createContext<TodoContextInterface>({
  todos: [],
  edit: null,
  handleAddTask: () => {},
  handleRemoveTask: () => {},
  handleEditTask: () => {},
  handleUploadTask: () => {},
  handleSwitchState: () => {},
});

export const useTodoContext = () => useContext(TodoContext);

interface Props {
  children: ReactNode;
}

export const TodoContextProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (todos.length === 0) {
      fetchTodos();
    }
  }, [todos]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get<Todo[]>(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTask = async (newTodo: Todo) => {
    try {
      const response = await axios.post<Todo>(API_URL, newTodo);
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditTask = (taskEdited: Todo) => {
    setEditTodo(taskEdited);
  };

  const handleUploadTask = async (values: Todo) => {
    const { _id, ...editedTaskWithoutId } = values;
    try {
      const response = await axios.put<Todo>(
        `${API_URL}${_id}`,
        editedTaskWithoutId
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === _id ? { ...editedTaskWithoutId, _id } : todo
        )
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading task:", error);
    }
  };

  const handleSwitchState = async (values: Todo) => {
    const { _id, state, ...editedTaskWithoutId } = values;
    const newState = !state;
    try {
      const response = await axios.put<Todo>(`${API_URL}${_id}`, {
        ...editedTaskWithoutId,
        state: newState,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === _id ? { ...todo, state: newState } : todo
        )
      );
      return response.data;
    } catch (error) {
      console.error("Error switching state:", error);
    }
  };

  const handleRemoveTask = async (id: string) => {
    try {
      await axios.delete<Todo>(`${API_URL}${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        edit: editTodo,
        handleAddTask,
        handleEditTask,
        handleRemoveTask,
        handleUploadTask,
        handleSwitchState,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
