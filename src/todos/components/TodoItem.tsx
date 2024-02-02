"use client";

import { useOptimistic, startTransition } from "react";
import { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: TodoItemProps) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompletedValue: boolean) => ({
      ...state,
      complete: newCompletedValue,
    })
  );

  const handleToggle = async () => {
    //RESTapi y Handlers
    //toggleTodo(todo.id, !todo.complete);

    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
      toggleTodo(todoOptimistic.id, !todoOptimistic.complete);
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
    }
  };

  return (
    <>
      <div
        className={
          todoOptimistic.complete ? styles.todoDone : styles.todoPending
        }
      >
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
          <div
            onClick={handleToggle}
            className={`
            flex p-2 rounded-md cursor-pointer
            hover:bg-opacity-60
            ${todoOptimistic.complete ? "bg-green-100" : "bg-red-100"}
          `}
          >
            {todoOptimistic.complete ? (
              <IoCheckboxOutline size={24} />
            ) : (
              <IoSquareOutline size={24} />
            )}
          </div>
          <div className="text-center sm:text-left">
            {todoOptimistic.description}
          </div>
        </div>
      </div>
    </>
  );
};
