import "./addToDo.scss";
import { useState, type JSX } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import type { Todo } from "../../types/todo";
import { ToDoModal } from "../../components/ToDoModal/ToDoModal";

interface AddToDoProps {
  handleSaveTodoClick: (todo: Todo, resetTodo: () => void) => void;
  isAddTodoModalOpen: boolean;
  closeModal: () => void; // Optional prop for closing the modal
  onAddTodoClick: () => void; // Optional prop for additional actions on add click
}

const initialState: Todo = {
  id: "",
  title: "",
  text: "",
  completed: false,
  createdAt: new Date(),
};

export const AddToDo = ({
  // handleSaveTodoClick,
  isAddTodoModalOpen,
  closeModal,
  onAddTodoClick,
}: AddToDoProps): JSX.Element => {
  const [todo, setTodo] = useState<Todo>(initialState);
  // const {  handleSaveTodoClick } = useToDoContext();

  // const resetTodo = () => {
  //   setTodo(initialState);
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    if (name === "taskTitle") {
      setTodo((prev) => ({ ...prev, title: value }));
    }
    if (name === "taskText") {
      setTodo((prev) => ({ ...prev, text: value }));
    }
  };

  return (
    <div className="addToDoContainer">
      <p className="addToDoTitle">Add ToDo</p>
      {isAddTodoModalOpen && (
        <ToDoModal
          closeModal={closeModal}
          todo={todo}
          handleInputChange={handleInputChange}
          modalTitle="Add ToDo"
        />
      )}
      <button className="buttonAdd" onClick={() => onAddTodoClick()}>
        <FaRegPlusSquare size={40} color="#2b2b2b" className="buttonAddIcon" />
      </button>
    </div>
  );
};
