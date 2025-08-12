import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Todo as TodoType } from "../../../types/todo";
import { ToDo } from "../ToDo";

const todo: TodoType = {
  id: "abc",
  text: "text",
  completed: false,
  createdAt: new Date(),
  settings: {
    isDueDateActive: true,
    isPriorityActive: true,
    isTitleActive: true,
  },
};

test("renders and trigger actions", async () => {
  const user = userEvent.setup();
  const remove = jest.fn();
  const toggle = jest.fn();
  const edit = jest.fn();

  render(<ToDo todo={todo} removeTodo={remove} onEditIconClick={edit} setToDoComplete={toggle} />);

  await user.click(screen.getByRole("button", { name: "checkbox" }));
  expect(toggle).toHaveBeenCalledWith("abc");

  await user.click(screen.getByRole("button", { name: "edit" }));
  expect(edit).toHaveBeenCalledWith("abc");

  await user.click(screen.getByRole("button", { name: "delete" }));
  expect(remove).toHaveBeenCalledWith("abc");
});
