import type { Todo } from "../types/todo";

export const reviveTodoDates = (raw: unknown): Todo[] | null => {
  if (!Array.isArray(raw)) return null;
  return raw.map((t: any) => ({
    ...t,
    createdAt: t?.createdAt ? new Date(t.createdAt) : new Date(),
    dueDate: t?.dueDate ? new Date(t.dueDate) : undefined,
  }));
};
