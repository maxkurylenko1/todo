import { createContext, useContext, useEffect, useState } from "react";
import type { Todo } from "../types/todo";
import { loadFromStorage, setToStorage } from "../utils/getFromLocalStorage";

interface ToDoContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  updateTodo: (updatedTodo: Todo) => void;
}

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export const ToDoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => loadFromStorage<Todo[]>("todos") || []);

  useEffect(() => {
    setToStorage("todos", todos);
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  return <ToDoContext.Provider value={{ todos, addTodo, removeTodo, updateTodo }}>{children}</ToDoContext.Provider>;
};

export const useToDoContext = (): ToDoContextType => {
  const context = useContext(ToDoContext);
  if (!context) {
    throw new Error("useToDoContext must be used within a ToDoProvider");
  }
  return context;
};
