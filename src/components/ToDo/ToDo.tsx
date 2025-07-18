import "./todo.scss";
import moment from "moment";
import type { JSX } from "react";
import type { Todo } from "../../types/todo";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

interface ToDoProps {
  todo: Todo;
  removeTodo: (id: string) => void;
  updateTodo: (updatedTodo: Todo) => void;
}

export const ToDo = ({ todo, removeTodo, updateTodo }: ToDoProps): JSX.Element => {
  return (
    <div className="todoItem">
      <div>
        <h3 className="todoTitle">
          <span className="titleText">{`${todo.title}`}</span>
        </h3>
        <p className={`todoText ${todo.completed ? "completed" : ""}`}>{todo.text}</p>
      </div>
      <div className="todoActions">
        <button onClick={() => updateTodo({ ...todo, completed: !todo.completed })} className="iconButton">
          {todo.completed ? <RxCross2 size={34} color="#e77e73ff" /> : <TiTickOutline size={34} color="#a0c774ff" />}
        </button>
        <button onClick={() => removeTodo(todo.id)} className="iconButton">
          <FaRegTrashCan size={28} color="#6e6e6eff" />
        </button>
      </div>
      <p className="createdAt">Created at: {`${moment(todo.createdAt).format("MMMM Do YYYY, h:mm a")}`}</p>
    </div>
  );
};
