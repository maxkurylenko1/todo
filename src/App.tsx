import "./styles/app.scss";
import SplitText from "./components/SplitText/SplitText";
import { AddToDo } from "./features/AddToDo/AddToDo";
import { ToDoList } from "./features/ToDoList/ToDoList";
import type { Todo } from "./types/todo";
import { useToDoContext } from "./context/ToDoContext";

function App() {
  const { todos, addTodo, removeTodo, updateTodo } = useToDoContext();

  const handleAddClick = (todo: Todo, resetTodo: () => void) => {
    if (!todo.text.trim()) {
      return; // Prevent adding empty todos
    }

    const newTodo: Todo = {
      ...todo,
      title: "Task#", // Assuming title is the same as text for simplicity
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    addTodo(newTodo);
    resetTodo();

    console.log("Todo added:", newTodo);
    console.log("Current todos:", todos);
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
        </header>
        <main className="appMain">
          <AddToDo handleAddClick={handleAddClick} />
          <ToDoList todos={todos} handleRemoveTodo={removeTodo} handleUpdateTodo={updateTodo} />
        </main>
      </div>
    </div>
  );
}

export default App;
