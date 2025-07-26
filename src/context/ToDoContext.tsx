import { createContext, useContext, useEffect, useState } from "react";
import type { Todo } from "../types/todo";
import { loadFromStorage, setToStorage } from "../utils/getFromLocalStorage";

interface ToDoContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  updateTodo: (updatedTodo: Todo) => void;
  clearTodos: () => void;
  isSettingsModalOpen: boolean;
  isAddTodoModalOpen: boolean;
  setIsSettingsModalOpen: (open: boolean) => void;
  setIsAddTodoModalOpen: (open: boolean) => void;
}

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export const ToDoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => loadFromStorage<Todo[]>("todos") || []);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setToStorage("todos", todos);
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [todo, ...prevTodos]);
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const clearTodos = () => {
    setTodos([]);
    setToStorage("todos", []);
  };

  return (
    <ToDoContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        updateTodo,
        clearTodos,
        isSettingsModalOpen,
        isAddTodoModalOpen,
        setIsSettingsModalOpen,
        setIsAddTodoModalOpen,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export const useToDoContext = (): ToDoContextType => {
  const context = useContext(ToDoContext);
  if (!context) {
    throw new Error("useToDoContext must be used within a ToDoProvider");
  }
  return context;
};
