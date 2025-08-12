import { searchFilterTodos } from "../searchFilterTodos";
import type { Todo } from "../../types/todo";

const base = (p: Partial<Todo> = {}): Todo => ({
  id: crypto.randomUUID(),
  text: "Buy milk",
  title: "Bake a cake",
  completed: false,
  createdAt: new Date(),
  settings: {
    isDueDateActive: true,
    isPriorityActive: true,
    isTitleActive: true,
  },
  ...p,
});

test("Filter text or text & title if title is active", () => {
  const todos = [
    base(),
    base({ text: "Go to the gym" }),
    base({ text: "Take umbrella if raining", title: "Go to grocery" }),
  ];
  expect(searchFilterTodos(todos, "milk")).toHaveLength(1);
  expect(searchFilterTodos(todos, "gym")).toHaveLength(1);
  expect(searchFilterTodos(todos, "groc")).toHaveLength(1);
});

test("ignore title when title disabled", () => {
  const todos = [
    base({ settings: { isTitleActive: false, isDueDateActive: true, isPriorityActive: true } }),
  ];
  expect(searchFilterTodos(todos, "cake")).toHaveLength(0);
});
