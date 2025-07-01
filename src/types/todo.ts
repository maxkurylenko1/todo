export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date; // Optional property for due date
  priority?: "low" | "medium" | "high"; // Optional property for priority
  tags?: string[]; // Optional property for tags
}
