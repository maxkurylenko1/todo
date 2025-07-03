import "./addToDo.scss";
import type { JSX } from "react";
import { FaRegPlusSquare } from "react-icons/fa";

export const AddToDo = (): JSX.Element => {
  return (
    <div className="addToDoContainer">
      <label className="addToDoLabel">Add a task:</label>
      <div className="toDoInputContainer">
        <input type="text" className="toDoInput" />
        <FaRegPlusSquare size={30} color="#2b2b2b" className="addIcon" />
      </div>
    </div>
  );
};
