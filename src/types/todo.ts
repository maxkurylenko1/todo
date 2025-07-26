export interface Todo {
  id: string;
  title?: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
}
