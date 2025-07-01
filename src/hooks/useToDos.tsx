import { useState } from "react";
import type { Todo } from "../types/todo";

interface UseTodosReturn {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  updateTodo: (updatedTodo: Todo) => void;
}

export const useTodos = (initialTodos: Todo[]): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };
  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  return { todos, addTodo, removeTodo, updateTodo };
};
