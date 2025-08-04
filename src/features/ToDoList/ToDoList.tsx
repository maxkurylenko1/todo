import "./toDoList.scss";
import type { Todo } from "../../types/todo";
import { ToDo } from "../../components/ToDo/ToDo";
import { useToDoContext } from "../../context/ToDoContext";
import { ToDoModal } from "../../components/ToDoModal/ToDoModal";
import type { JSX } from "react";

interface ToDoListProps {
  todos: Todo[];
  handleRemoveTodo: (id: string) => void;
  handleUpdateTodo: (updatedTodo: Todo) => void;
  isEditTodoModalOpen: boolean;
  editTodoIconClick: (id: string) => void;
}

export const ToDoList = ({
  todos,
  handleRemoveTodo,
  editTodoIconClick,
}: ToDoListProps): JSX.Element => {
  const { setToDoComplete, isEditTodoModalOpen } = useToDoContext();

  return (
    <div className="todoList">
      {todos.map((todo) => (
        <ToDo
          key={todo.id}
          todo={todo}
          removeTodo={handleRemoveTodo}
          setToDoComplete={setToDoComplete}
          onEditIconClick={editTodoIconClick}
        />
      ))}
      {isEditTodoModalOpen && <ToDoModal modalTitle={"Edit ToDo"} isEditMode={true}></ToDoModal>}
    </div>
  );
};
