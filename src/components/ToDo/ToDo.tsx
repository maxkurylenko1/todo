import "./todo.scss";
import moment from "moment";
import type { JSX } from "react";
import type { Todo } from "../../types/todo";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";

interface ToDoProps {
  todo: Todo;
  removeTodo: (id: string) => void;
  setToDoComplete: (id: string) => void;
  onEditIconClick: (id: string) => void;
}

export const ToDo = ({
  todo,
  removeTodo,
  setToDoComplete,
  onEditIconClick,
}: ToDoProps): JSX.Element => {
  return (
    <div className={`${todo.completed ? "completedTodo" : ""} todoItem ${todo.priority}`}>
      <div>
        {todo.title && (
          <h3 className="todoTitle">
            <span className={`${todo.completed ? "completed" : ""} titleText`}>
              {`${todo.title}`}
            </span>
          </h3>
        )}
        <p className={`todoText ${todo.completed ? "completed" : ""}`}>{todo.text}</p>
      </div>
      <div className="todoActions">
        <button onClick={() => onEditIconClick(todo.id)} className="iconButton" aria-label="edit">
          <MdOutlineEdit size={28} color="#6e6e6eff" />
        </button>
        <button
          onClick={() => setToDoComplete(todo.id)}
          className="iconButton"
          aria-label="checkbox"
        >
          {todo.completed ? (
            <MdCheckBox size={32} color="#a0c774ff" />
          ) : (
            <MdOutlineCheckBoxOutlineBlank size={32} color="rgb(110, 110, 110)" />
          )}
        </button>
        <button onClick={() => removeTodo(todo.id)} className="iconButton" aria-label="delete">
          <FaRegTrashCan size={28} color="#6e6e6eff" />
        </button>
      </div>
      <p className="createdAt">
        Created at: {`${moment(todo.createdAt).format("MMM Do YYYY, h:mm a")}`}
      </p>
      {todo.dueDate && (
        <p
          className={`deadline ${
            todo.completed
              ? "completed"
              : moment(todo.dueDate).isBefore(new Date())
              ? "overdue"
              : ""
          }`}
        >
          Deadline: {`${moment(todo.dueDate).format("MMM Do YYYY, h:mm a")}`}
        </p>
      )}
      {todo.priority && (
        <p className="priority">
          Priority: {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
        </p>
      )}
    </div>
  );
};
