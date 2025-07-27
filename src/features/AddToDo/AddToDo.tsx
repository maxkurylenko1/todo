import "./addToDo.scss";
import { useState, type JSX } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import type { Todo } from "../../types/todo";
import { ToDoModal } from "../../components/ToDoModal/ToDoModal";
import { useToDoContext } from "../../context/ToDoContext";

interface AddToDoProps {
  isAddTodoModalOpen: boolean;
  closeModal: () => void;
  onAddTodoIconClick: () => void;
  onSaveTodoClick: (todo: Todo, resetTodo: () => void) => void;
}

export interface TodoExtanded extends Todo {
  dueTime?: Date;
}

const initialTodo: TodoExtanded = {
  id: "",
  text: "",
  completed: false,
  createdAt: new Date(),
};

export const AddToDo = ({
  isAddTodoModalOpen,
  closeModal,
  onAddTodoIconClick,
  onSaveTodoClick,
}: AddToDoProps): JSX.Element => {
  const { settings } = useToDoContext();
  const [currentTodo, setCurrentTodo] = useState<TodoExtanded>(initialTodo);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setCurrentTodo((prevTodos) => ({ ...prevTodos, [name]: value }));
  };

  const handleSaveTodoClick = () => {
    onSaveTodoClick(currentTodo, resetTodo);
  };

  const resetTodo = () => {
    setCurrentTodo(initialTodo);
  };

  return (
    <div className="addToDoContainer">
      <p className="addToDoTitle">Add ToDo</p>
      {isAddTodoModalOpen && (
        <ToDoModal
          closeModal={closeModal}
          todo={currentTodo}
          handleChange={handleChange}
          settings={settings}
          modalTitle="Add ToDo"
          handleSaveTodoClick={handleSaveTodoClick}
        />
      )}
      <button className="buttonAdd" onClick={() => onAddTodoIconClick()}>
        <FaRegPlusSquare size={40} color="#2b2b2b" className="buttonAddIcon" />
      </button>
    </div>
  );
};
