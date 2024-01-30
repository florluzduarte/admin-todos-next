"use client";

import { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: TodoItemProps) => {
  const handleToggle = () => {
    toggleTodo(todo.id, !todo.complete);
  };

  return (
    <>
      <div className={todo.complete ? styles.todoDone : styles.todoPending}>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
          <div
            onClick={handleToggle}
            className={`
            flex p-2 rounded-md cursor-pointer
            hover:bg-opacity-60
            ${todo.complete ? "bg-green-100" : "bg-red-100"}
          `}
          >
            {todo.complete ? (
              <IoCheckboxOutline size={24} />
            ) : (
              <IoSquareOutline size={24} />
            )}
          </div>
          <div className="text-center sm:text-left">{todo.description}</div>
        </div>
      </div>
    </>
  );
};
