import "./addToDo.scss";
import { useState, type JSX } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import type { Todo } from "../../types/todo";

interface AddToDoProps {
  handleAddClick: (todo: Todo, resetTodo: () => void) => void;
}

const initialState: Todo = {
  id: "",
  title: "",
  text: "",
  completed: false,
  createdAt: new Date(),
};

export const AddToDo = ({ handleAddClick }: AddToDoProps): JSX.Element => {
  const [todo, setTodo] = useState<Todo>(initialState);

  const resetTodo = () => {
    setTodo(initialState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setTodo((prev) => ({ ...prev, text: value }));
  };

  return (
    <div className="addToDoContainer">
      <div className="toDoInputWrapper">
        <div className="toDoTaskNameWrapper">
          <label className="addToDoLabel">Task name:</label>
          <div className="toDoInputContainer">
            <input type="text" value={todo.text} className="toDoInput" onChange={handleInputChange} />
          </div>
        </div>
        <div>
          <label className="addToDoLabel">Text:</label>
          <div className="toDoInputContainer">
            <input type="text" value={todo.text} className="toDoInput" onChange={handleInputChange} />
          </div>
        </div>
      </div>
      <button className="buttonAdd" onClick={() => handleAddClick(todo, resetTodo)}>
        <FaRegPlusSquare size={30} color="#2b2b2b" />
      </button>
    </div>
  );
};
