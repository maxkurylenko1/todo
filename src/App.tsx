import "./styles/app.scss";
import SplitText from "./components/SplitText/SplitText";
import { AddToDo } from "./features/AddToDo/AddToDo";
import { ToDoList } from "./features/ToDoList/ToDoList";
import type { Todo } from "./types/todo";

const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Learn React",
    description: "Study the basics of React and build a simple app.",
    completed: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Practice JavaScript",
    description: "Work on JavaScript exercises to improve coding skills.",
    completed: false,
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Read a book",
    description: "Finish reading 'The Pragmatic Programmer'.",
    completed: false,
    createdAt: new Date(),
  },
];

function App() {
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
          <AddToDo />
          <ToDoList initialTodos={initialTodos} />
        </main>
      </div>
    </div>
  );
}

export default App;
