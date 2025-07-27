import "./toDoList.scss";
import type { JSX } from "react";
import type { Todo } from "../../types/todo";
import { ToDo } from "../../components/ToDo/ToDo";

interface ToDoListProps {
  todos: Todo[];
  handleRemoveTodo: (id: string) => void;
  handleUpdateTodo: (updatedTodo: Todo) => void;
}

export const ToDoList = ({
  todos,
  handleRemoveTodo,
  handleUpdateTodo,
}: ToDoListProps): JSX.Element => {
  return (
    <div className="todoList">
      {todos.map((todo) => (
        <ToDo
          key={todo.id}
          todo={todo}
          removeTodo={handleRemoveTodo}
          updateTodo={handleUpdateTodo}
        />
      ))}
    </div>
  );
};
