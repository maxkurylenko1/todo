import "./toDoModal.scss";
import { Modal } from "../Modal/Modal";
import type { SettingsType } from "../../types/settings";
import type { TodoExtanded } from "../../features/AddToDo/AddToDo";

interface ToDoModalProps {
  closeModal: () => void;
  todo: TodoExtanded;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  modalTitle: string;
  settings: SettingsType;
  handleSaveTodoClick: () => void;
}

export const ToDoModal = ({
  closeModal,
  todo,
  handleChange,
  modalTitle,
  settings,
  handleSaveTodoClick,
}: ToDoModalProps) => {
  return (
    <Modal onClose={closeModal} onSave={handleSaveTodoClick}>
      <div className="addToDoWrapper">
        <h2 className="modalTitle">{modalTitle}</h2>
        {settings.isTitleActive && (
          <div className="toDoTaskNameWrapper">
            <p className="addToDoTitle">Task name:</p>
            <input
              type="text"
              value={todo.title}
              name="title"
              className="toDoInput"
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <p className="addToDoLabel">Text:</p>
          <input
            type="text"
            value={todo.text}
            name="text"
            className="toDoInput"
            onChange={handleChange}
          />
        </div>
        <div className="toDoOptionsWrapper">
          {settings.isDueDateActive && (
            <div className="toDoOption">
              <p>Deadline</p>
              <input type="date" name="dueDate" className="dueDate" onChange={handleChange} />
              <input type="time" name="dueTime" className="dueDate" onChange={handleChange} />
            </div>
          )}
          {settings.isPriorityActive && (
            <div className="toDoOption">
              <p>Priority</p>
              <select
                name="priority"
                value={todo.priority}
                className="prioritySelect"
                onChange={handleChange}
              >
                <option value="non" defaultChecked hidden>
                  Select priority
                </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
