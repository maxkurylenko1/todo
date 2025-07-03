import "./styles/app.scss";
import SplitText from "./components/SplitText/SplitText";
import { AddToDo } from "./features/AddToDo/AddToDo";

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
        <AddToDo />
      </div>
    </div>
  );
}

export default App;
