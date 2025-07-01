import type { JSX } from "react";
import type { Todo } from "../../types/todo";
import { useTodos } from "../../hooks/useToDos";
import { ToDo } from "../../components/ToDo/ToDo";
import { Button } from "../../components/Button/Button";

interface ToDoListProps {
    initialTodos: Todo[];
}

export const ToDoList = ({ initialTodos }: ToDoListProps): JSX.Element => {
    const { todos, removeTodo, updateTodo } = useTodos(initialTodos);

    return (
        <div className="todoList">
            <h2>To-Do List</h2>
            <div className="todos">
                {todos.map((todo) => (
                    <ToDo
                        key={todo.id}
                        todo={todo}
                        removeTodo={removeTodo}
                        updatedTodo={updateTodo}
                    />
                ))}
            </div>
            <Button>
                Add Todo
            </Button>
        </div>
    );
}