import { sortTodosList } from "../sortTodosList";
import type { Todo } from "../../types/todo";

const base = (p: Partial<Todo> = {}): Todo => ({
  id: crypto.randomUUID(),
  text: "t",
  completed: false,
  createdAt: new Date("2024-01-01"),
  settings: { isTitleActive: true, isDueDateActive: true, isPriorityActive: true },
  ...p,
});

test("sort by due date ascending; items without dueDate go last", () => {
  const todos = [
    base({ text: "a", dueDate: new Date("2025-02-01") }),
    base({ text: "b" }),
    base({ text: "c", dueDate: new Date("2025-01-01") }),
  ];
  const result = sortTodosList(todos, "dateAsc");
  expect(result.map((t) => t.text)).toEqual(["c", "a", "b"]);
});

test("sort by priority: high > medium > low > missing", () => {
  const todos = [
    base({ text: "x", priority: "low" }),
    base({ text: "y", priority: "high" }),
    base({ text: "z" }),
    base({ text: "m", priority: "medium" }),
  ];
  const result = sortTodosList(todos, "priority");
  expect(result.map((t) => t.text)).toEqual(["y", "m", "x", "z"]);
});

test("sort by completed puts completed first", () => {
  const todos = [base({ text: "a", completed: false }), base({ text: "b", completed: true })];
  const result = sortTodosList(todos, "completed");
  expect(result.map((t) => t.text)).toEqual(["b", "a"]);
});
