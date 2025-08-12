import type { Todo } from "../types/todo";

export const searchFilterTodos = (todos: Todo[], searchQuery: string) => {
  return todos.filter((todo) => {
    if (todo.settings.isTitleActive) {
      return (
        todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return todo.text.toLowerCase().includes(searchQuery.toLowerCase());
  });
};
