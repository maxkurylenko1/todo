import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddToDo } from "../AddToDo";

jest.mock("../../../components/ToDoModal/ToDoModal", () => ({
  ToDoModal: () => <div data-testid="todo-modal">Mock Modal</div>,
}));

describe("AddToDo component", () => {
  it("renders title", () => {
    render(
      <AddToDo
        isAddTodoModalOpen={false}
        onAddTodoIconClick={jest.fn()}
        onSaveTodoClick={jest.fn()}
      />
    );

    expect(screen.getByText(/Add ToDo/i)).toBeInTheDocument();
  });

  it("renders modal when isAddTodoModalOpen is true", () => {
    render(
      <AddToDo
        isAddTodoModalOpen={true}
        onAddTodoIconClick={jest.fn()}
        onSaveTodoClick={jest.fn()}
      />
    );

    expect(screen.getByTestId("todo-modal")).toBeInTheDocument();
  });

  it("does not render modal when isAddTodoModalOpen is false", () => {
    render(
      <AddToDo
        isAddTodoModalOpen={false}
        onAddTodoIconClick={jest.fn()}
        onSaveTodoClick={jest.fn()}
      />
    );

    expect(screen.queryByTestId("todo-modal")).not.toBeInTheDocument();
  });

  it("calls onAddTodoIconClick when button is clicked", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <AddToDo
        isAddTodoModalOpen={false}
        onAddTodoIconClick={handleClick}
        onSaveTodoClick={jest.fn()}
      />
    );

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
