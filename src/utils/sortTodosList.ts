import type { Todo } from "../types/todo";

export const sortTodosList = (todos: Todo[], option: string) => {
  return [...todos].sort((a, b) => {
    switch (option) {
      case "dateAsc":
        const aDue = a.dueDate ? new Date(a.dueDate).getTime() : 0;
        const bDue = b.dueDate ? new Date(b.dueDate).getTime() : 0;
        return aDue - bDue;
      case "priority": {
        const priorityOrder: Record<string, number> = { low: 1, medium: 2, high: 3 };
        const aPriority = a.priority ? priorityOrder[a.priority] : 0;
        const bPriority = b.priority ? priorityOrder[b.priority] : 0;
        return bPriority - aPriority;
      }
      case "completed":
        return Number(b.completed) - Number(a.completed);
      default:
        return 0;
    }
  });
};
