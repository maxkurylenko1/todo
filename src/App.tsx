import "./styles/app.scss";
import SplitText from "./components/SplitText/SplitText";
import { DiAptana } from "react-icons/di";
import { AddToDo } from "./features/AddToDo/AddToDo";
import { ToDoList } from "./features/ToDoList/ToDoList";
import { useToDoContext } from "./context/ToDoContext";
import { Settings } from "./features/Settings/Settings";

function App() {
  const {
    todos,
    saveTodo,
    removeTodo,
    updateTodo,
    setIsAddTodoModalOpen,
    setIsSettingsModalOpen,
    isAddTodoModalOpen,
    isSettingsModalOpen,
    isEditTodoModalOpen,
    editToDoModalOpen,
  } = useToDoContext();

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(true);
  };

  const handleAddTodoIconClick = () => {
    setIsAddTodoModalOpen(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
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
            isAddTodoModalOpen={isAddTodoModalOpen}
            onSaveTodoClick={saveTodo}
            onAddTodoIconClick={handleAddTodoIconClick}
          />
          <ToDoList
            todos={todos}
            handleRemoveTodo={removeTodo}
            handleUpdateTodo={updateTodo}
            editTodoIconClick={editToDoModalOpen}
            isEditTodoModalOpen={isEditTodoModalOpen}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
