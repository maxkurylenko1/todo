import type { Todo } from "../types/todo";

export const validateTodo = (todo: Todo): string[] => {
  const errors: string[] = [];
  if (todo.settings.isTitleActive && !todo.title?.trim()) errors.push("title");
  if (!todo.text.trim()) errors.push("text");
  if (todo.settings.isDueDateActive && !todo.dueDate) errors.push("dueDate");
  if (todo.settings.isPriorityActive && !todo.priority) errors.push("priority");
  return errors;
};
