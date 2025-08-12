import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Todo } from "../types/todo";
import type { SettingsType } from "../types/settings";
import { loadFromStorage, setToStorage } from "../utils/localStorage";
import { sortTodosList } from "../utils/sortTodosList";
import { searchFilterTodos } from "../utils/searchFilterTodos";
import { validateTodo } from "../utils/validateTodo";
import { reviveTodoDates } from "../utils/reviveTodoDates";
import type { ModalStateType } from "../types/modalState";

interface ToDoContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  updateTodo: (updatedTodo: Todo) => void;
  saveTodo: (todo: Todo, resetTodo: () => void) => void;
  clearTodos: () => void;
  addToDosettings: SettingsType;
  updateSettings: (settings: SettingsType) => void;
  inputErrors: string[];
  closeTodoModal: (resetToDo: () => void, isEditMode: boolean) => void;
  setToDoComplete: (id: string) => void;
  updateModalToDo: (todo: Todo, resetEditToDo: () => void) => void;
  modalTodo: Todo;
  editToDoModalOpen: (id: string) => void;
  filterInputErrors: (inputName: string) => void;
  setSearchQuery: (searchQuery: string) => void;
  sortOption: string;
  setSortOption: (sortOption: string) => void;
  modalState: ModalStateType;
  setModalState: (state: ModalStateType) => void;
}

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export const ToDoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(
    () => loadFromStorage<Todo[]>("todos", reviveTodoDates) || []
  );
  const [modalState, setModalState] = useState<ModalStateType>("non");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("non");
  const [modalTodo, setModalTodo] = useState<Todo>({
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
  const [addToDosettings, setAddToDosettings] = useState<SettingsType>(
    () =>
      loadFromStorage<SettingsType>("settings") || {
        isDueDateActive: true,
        isPriorityActive: true,
        isTitleActive: true,
      }
  );
  const [inputErrors, setInputErrors] = useState<string[]>([]);
  const filteredTodos = useMemo(
    () => sortTodosList(searchFilterTodos(todos, searchQuery), sortOption),
    [todos, sortOption, searchQuery]
  );

  useEffect(() => {
    setToStorage("todos", todos);
  }, [todos]);

  useEffect(() => {
    setToStorage("settings", addToDosettings);
  }, [addToDosettings]);

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [todo, ...prevTodos]);
    setSortOption("non"); // Reset sort option when adding a new todo
    setSearchQuery(""); // Reset search query when adding a new todo
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const clearTodos = () => {
    setTodos([]);
    setToStorage("todos", []);
  };

  const updateSettings = (settings: SettingsType) => {
    setAddToDosettings(settings);
  };

  const closeTodoModal = (resetToDo: () => void) => {
    setModalState("non");
    resetToDo();
    setInputErrors([]); // Clear input errors when closing the modal
  };

  const setToDoComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const updateModalToDo = (todo: Todo, resetToDo: () => void) => {
    const errors: string[] = validateTodo(todo);

    if (errors.length > 0) {
      setInputErrors(errors);
      return; // Do not save if there are input errors
    }

    updateTodo(todo);
    resetToDo();
    setInputErrors([]);
    setModalState("non");
  };

  const saveTodo = (todo: Todo, resetTodo: () => void) => {
    const errors: string[] = validateTodo(todo);

    if (errors.length > 0) {
      setInputErrors(errors);
      return; // Do not save if there are input errors
    }

    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      settings: addToDosettings,
    };

    addTodo(newTodo);
    resetTodo(); // Reset the current todo state
    setInputErrors([]); // Clear input errors after saving
    setModalState("non");
  };

  const editToDoModalOpen = (id: string) => {
    setModalState("edit");
    setModalTodo((prevState) => {
      const todoToEdit = todos.find((todo) => todo.id === id);
      return todoToEdit ? { ...todoToEdit } : prevState;
    });
  };

  const filterInputErrors = (inputName: string) => {
    setInputErrors(inputErrors.filter((error) => error !== inputName));
  };

  return (
    <ToDoContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        updateTodo,
        clearTodos,
        addToDosettings,
        updateSettings,
        updateModalToDo,
        inputErrors,
        closeTodoModal,
        setToDoComplete,
        modalTodo,
        saveTodo,
        editToDoModalOpen,
        filterInputErrors,
        filteredTodos,
        setSearchQuery,
        sortOption,
        setSortOption,
        modalState,
        setModalState,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export const useToDoContext = (): ToDoContextType => {
  const context = useContext(ToDoContext);
  if (!context) {
    throw new Error("useToDoContext must be used within a ToDoProvider");
  }
  return context;
};
