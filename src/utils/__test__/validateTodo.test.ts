import { validateTodo } from "../validateTodo";
import type { Todo } from "../../types/todo";

const base = (p: Partial<Todo> = {}): Todo => ({
  id: crypto.randomUUID(),
  text: "Text",
  completed: false,
  createdAt: new Date(),
  settings: { isDueDateActive: true, isPriorityActive: true, isTitleActive: true },
  ...p,
});

test("Errors on missing fields based on settings", () => {
  const todo = base({ text: "", title: "", dueDate: undefined, priority: undefined });
  const errors = validateTodo(todo);
  expect(errors).toEqual(expect.arrayContaining(["text", "title", "dueDate", "priority"]));
});

test("No errors when optional fields disabled", () => {
  const todo = base({
    text: "ok",
    settings: { isTitleActive: false, isDueDateActive: false, isPriorityActive: false },
  });
  expect(validateTodo(todo)).toEqual([]);
});
