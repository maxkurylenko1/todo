import "./todo.scss";
import type { JSX } from "react";
import type { Todo } from "../../types/todo";

interface ToDoProps {
  todo: Todo;
  removeTodo: (id: string) => void;
  updatedTodo: (updatedTodo: Todo) => void;
}

export const ToDo = ({ todo, removeTodo, updatedTodo }: ToDoProps): JSX.Element => {
  return (
    <div className="todoItem">
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <div className="todoActions">
        <button onClick={() => removeTodo(todo.id)}>Remove</button>
        <button onClick={() => updatedTodo({ ...todo, completed: !todo.completed })}>{todo.completed ? "Mark as Incomplete" : "Mark as Complete"}</button>
      </div>
    </div>
  );
};
