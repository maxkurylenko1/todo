import "./toDoModal.scss";
import type { Todo } from "../../types/todo";
import { Modal } from "../Modal/Modal";

interface ToDoModalProps {
  closeModal: () => void;
  todo: Todo;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  modalTitle: string;
}

export const ToDoModal = ({ closeModal, todo, handleInputChange, modalTitle }: ToDoModalProps) => {
  return (
    <Modal onClose={closeModal} onSave={() => {}}>
      <div className="addToDoWrapper">
        <h2 className="modalTitle">{modalTitle}</h2>
        <div className="toDoTaskNameWrapper">
          <p className="addToDoTitle">Task name:</p>
          <input
            type="text"
            value={todo.title}
            name="taskTitle"
            className="toDoInput"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <p className="addToDoLabel">Text:</p>
          <input
            type="text"
            value={todo.text}
            name="taskText"
            className="toDoInput"
            onChange={handleInputChange}
          />
        </div>
        <div className="toDoOptionsWrapper">
          <div className="toDoOption">
            <p>Deadline</p>
            <input type="date" name="dueDate" className="dueDate" />
            <input type="time" name="duetime" className="dueDate" />
          </div>
          <div className="toDoOption">
            <p>Priority</p>
            <select name="priority" className="prioritySelect">
              <option value="non" defaultChecked hidden>
                Select priority
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};
