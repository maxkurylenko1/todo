import "./toDoModal.scss";
import { Modal } from "../Modal/Modal";
import type { Todo } from "../../types/todo";
import { useToDoContext } from "../../context/ToDoContext";
import { useState } from "react";

interface ToDoModalProps {
  modalTitle: string;
  isEditMode: boolean;
}

export const ToDoModal = ({ modalTitle, isEditMode }: ToDoModalProps) => {
  const {
    inputErrors,
    updateModalToDo,
    closeTodoModal,
    modalTodo,
    addToDosettings,
    saveTodo,
    filterInputErrors,
  } = useToDoContext();

  const initialTodo: Todo = {
    id: "",
    text: "",
    completed: false,
    createdAt: new Date(),
    settings: addToDosettings,
  };

  const [currentToDo, setCurrentToDo] = useState<Todo>(() =>
    isEditMode ? modalTodo : initialTodo
  );

  const settings = isEditMode ? modalTodo.settings : addToDosettings;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    filterInputErrors(name);

    setCurrentToDo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleToDoSave = () => {
    if (isEditMode) {
      updateModalToDo(currentToDo, resetToDo);
    } else {
      saveTodo(currentToDo, resetToDo);
    }
  };

  const closeModal = () => {
    closeTodoModal(resetToDo, isEditMode);
  };

  const resetToDo = () => {
    setCurrentToDo({
      id: "",
      text: "",
      completed: false,
      createdAt: new Date(),
      settings: {
        isDueDateActive: false,
        isPriorityActive: false,
        isTitleActive: false,
      },
    });
  };

  return (
    <Modal onClose={closeModal} onSave={handleToDoSave}>
      <div className="addToDoWrapper">
        <h2 className="modalTitle">{modalTitle}</h2>
        {settings.isTitleActive && (
          <div className="toDoTaskNameWrapper">
            <p className="addToDoModalTitle">Task name:</p>
            <input
              type="text"
              value={currentToDo.title?.length ? currentToDo.title : ""}
              name="title"
              className={inputErrors.includes("title") ? "toDoInput required" : "toDoInput"}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <p className="addToDoLabel">Text:</p>
          <input
            type="text"
            value={currentToDo.text}
            name="text"
            className={`toDoInput ${inputErrors.includes("text") ? "required" : ""}`}
            onChange={handleChange}
          />
        </div>
        <div className="toDoOptionsWrapper">
          {settings.isDueDateActive && (
            <div className="toDoOption">
              <p>Deadline</p>
              <input
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                value={currentToDo.dueDate ? currentToDo.dueDate.toISOString().slice(0, 16) : ""}
                name="dueDate"
                className={`toDoInput ${inputErrors.includes("dueDate") ? "required" : ""}`}
                onChange={handleChange}
              />
            </div>
          )}
          {settings.isPriorityActive && (
            <div className="toDoOption">
              <p>Priority</p>
              <select
                name="priority"
                value={currentToDo.priority}
                className={`prioritySelect ${inputErrors.includes("priority") ? "required" : ""}`}
                onChange={handleChange}
              >
                {!currentToDo.priority && (
                  <option value="non" defaultChecked hidden>
                    Select priority
                  </option>
                )}
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
