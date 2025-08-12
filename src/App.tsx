import "./styles/app.scss";
import SplitText from "./components/SplitText/SplitText";
import { DiAptana } from "react-icons/di";
import { AddToDo } from "./features/AddToDo/AddToDo";
import { ToDoList } from "./features/ToDoList/ToDoList";
import { useToDoContext } from "./context/ToDoContext";
import { Settings } from "./features/Settings/Settings";
import { SearchSortBar } from "./features/SearchSortBar/SearchSortBar";

function App() {
  const {
    todos,
    filteredTodos,
    saveTodo,
    removeTodo,
    updateTodo,
    modalState,
    setModalState,
    editToDoModalOpen,
  } = useToDoContext();

  const handleSettingsClick = () => {
    setModalState("settings");
  };

  const handleAddTodoIconClick = () => {
    setModalState("add");
  };

  const closeSettingsModal = () => {
    setModalState("non");
  };

  const handleEditTodoIconClick = (id: string) => {
    setModalState("edit");
    editToDoModalOpen(id);
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
          {modalState === "settings" && <Settings closeModal={closeSettingsModal} />}
          <AddToDo
            isAddTodoModalOpen={modalState === "add"}
            onSaveTodoClick={saveTodo}
            onAddTodoIconClick={handleAddTodoIconClick}
          />
          {todos.length > 0 && <SearchSortBar />}
          <ToDoList
            todos={filteredTodos}
            handleRemoveTodo={removeTodo}
            handleUpdateTodo={updateTodo}
            editTodoIconClick={handleEditTodoIconClick}
            isEditTodoModalOpen={modalState === "edit"}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
