import "./styles/app.scss";
import SplitText from "./components/SplitText/SplitText";
import { DiAptana } from "react-icons/di";
import { AddToDo } from "./features/AddToDo/AddToDo";
import { ToDoList } from "./features/ToDoList/ToDoList";
import type { Todo } from "./types/todo";
import { useToDoContext } from "./context/ToDoContext";
import { Settings } from "./features/Settings/Settings";

function App() {
  const {
    todos,
    addTodo,
    removeTodo,
    updateTodo,
    setIsAddTodoModalOpen,
    setIsSettingsModalOpen,
    isAddTodoModalOpen,
    isSettingsModalOpen,
  } = useToDoContext();

  const handleSaveToDoClick = (todo: Todo, resetTodo: () => void) => {
    if (!todo.text.trim()) {
      return; // Prevent adding empty todos
    }

    console.log(todo);

    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    addTodo(newTodo);
    resetTodo();
    closeAddTodoModal();
  };

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(true);
  };

  const handleAddTodoIconClick = () => {
    setIsAddTodoModalOpen(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  const closeAddTodoModal = () => {
    setIsAddTodoModalOpen(false);
  };

  return (
    <div className="appContainer">
      <div className="todoContainer">
        <header className="appHeader">
          <SplitText
            text="ToDo List"
            className="appTitle"
            delay={100}
            duration={2}
            ease="elastic.out(1, 0.3)"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <span className="restartAnimation">•</span>
          <DiAptana
            size={35}
            color="#696969ff"
            className="toDoSettings"
            onClick={handleSettingsClick}
          />
        </header>
        <main className="appMain">
          {isSettingsModalOpen && <Settings closeModal={closeSettingsModal} />}
          <AddToDo
            closeModal={closeAddTodoModal}
            isAddTodoModalOpen={isAddTodoModalOpen}
            onSaveTodoClick={handleSaveToDoClick}
            onAddTodoIconClick={handleAddTodoIconClick}
          />
          <ToDoList todos={todos} handleRemoveTodo={removeTodo} handleUpdateTodo={updateTodo} />
        </main>
      </div>
    </div>
  );
}

export default App;
