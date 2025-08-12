import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Todo } from "../types/todo";
import type { SettingsType } from "../types/settings";
import { loadFromStorage, setToStorage } from "../utils/getFromLocalStorage";
import { sortTodosList } from "../utils/sortTodosList";
import { searchFilterTodos } from "../utils/searchFilterTodos";

interface ToDoContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  updateTodo: (updatedTodo: Todo) => void;
  clearTodos: () => void;
  isSettingsModalOpen: boolean;
  isAddTodoModalOpen: boolean;
  setIsSettingsModalOpen: (isOpen: boolean) => void;
  setIsAddTodoModalOpen: (isOpen: boolean) => void;
  addToDosettings: SettingsType;
  updateSettings: (settings: SettingsType) => void;
  isEditTodoModalOpen: boolean;
  setIsEditTodoModalOpen: (isModalOpen: boolean) => void;
  inputErrors: string[];
  closeTodoModal: (resetToDo: () => void, isEditMode: boolean) => void;
  setToDoComplete: (id: string) => void;
  updateModalToDo: (todo: Todo, resetEditToDo: () => void) => void;
  modalTodo: Todo;
  saveTodo: (todo: Todo, resetTodo: () => void) => void;
  editToDoModalOpen: (id: string) => void;
  filterInputErrors: (inputName: string) => void;
  filteredTodos: Todo[];
  setSearchQuery: (searchQuery: string) => void;
  sortOption: string;
  setSortOption: (sortOption: string) => void;
}

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export const ToDoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => loadFromStorage<Todo[]>("todos") || []);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState<boolean>(false);
  const [isEditTodoModalOpen, setIsEditTodoModalOpen] = useState<boolean>(false);
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
  // const debounce = useDebounce(searchFilterTodos, 300);
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

  const closeTodoModal = (resetToDo: () => void, isEditMode: boolean) => {
    if (isEditMode) {
      setIsEditTodoModalOpen(false);
    } else {
      setIsAddTodoModalOpen(false);
    }
    resetToDo();
    setInputErrors([]); // Clear input errors when closing the modal
  };

  const setToDoComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const updateModalToDo = (todo: Todo, resetToDo: () => void) => {
    const errors: string[] = [];

    if (todo.settings.isTitleActive && !todo.title?.trim()) {
      errors.push("title");
    }

    if (!todo.text.trim()) {
      errors.push("text");
    }

    if (todo.settings.isDueDateActive && !todo.dueDate) {
      errors.push("dueDate");
    }

    if (todo.settings.isPriorityActive && !todo.priority) {
      errors.push("priority");
    }

    if (errors.length > 0) {
      setInputErrors(errors);
      return; // Do not save if there are input errors
    }

    updateTodo(todo);
    resetToDo();
    setInputErrors([]);
    setIsEditTodoModalOpen(false);
  };

  const saveTodo = (todo: Todo, resetTodo: () => void) => {
    const errors: string[] = [];

    if (todo.settings.isTitleActive && !todo.title?.trim()) {
      errors.push("title");
    }

    if (!todo.text.trim()) {
      errors.push("text");
    }

    if (todo.settings.isDueDateActive && !todo.dueDate) {
      errors.push("dueDate");
    }

    if (todo.settings.isPriorityActive && !todo.priority) {
      errors.push("priority");
    }

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
    setIsAddTodoModalOpen(false);
  };

  const editToDoModalOpen = async (id: string) => {
    setModalTodo((prevState) => {
      const todoToEdit = todos.find((todo) => todo.id === id);
      return todoToEdit ? { ...todoToEdit } : prevState;
    });
  };

  useEffect(() => {
    if (modalTodo.id) {
      setIsEditTodoModalOpen(true);
    }
  }, [modalTodo]);

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
        isSettingsModalOpen,
        isAddTodoModalOpen,
        setIsSettingsModalOpen,
        setIsAddTodoModalOpen,
        addToDosettings,
        updateSettings,
        isEditTodoModalOpen,
        setIsEditTodoModalOpen,
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
