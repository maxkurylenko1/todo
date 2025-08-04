import "./addToDo.scss";
import type { JSX } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import type { Todo } from "../../types/todo";
import { ToDoModal } from "../../components/ToDoModal/ToDoModal";

interface AddToDoProps {
  isAddTodoModalOpen: boolean;
  onAddTodoIconClick: () => void;
  onSaveTodoClick: (todo: Todo, resetTodo: () => void) => void;
}

export const AddToDo = ({ isAddTodoModalOpen, onAddTodoIconClick }: AddToDoProps): JSX.Element => {
  return (
    <div className="addToDoContainer">
      <p className="addToDoTitle">Add ToDo</p>
      {isAddTodoModalOpen && <ToDoModal modalTitle="Add ToDo" isEditMode={false} />}
      <button className="buttonAdd" onClick={() => onAddTodoIconClick()}>
        <FaRegPlusSquare size={40} color="#2b2b2b" className="buttonAddIcon" />
      </button>
    </div>
  );
};
