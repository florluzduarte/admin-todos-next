"use client";

import { Todo } from "@prisma/client";
import { TodoItem } from "..";

import * as todosApi from "@/todos/helpers/todosHelper";
import { useRouter } from "next/navigation";

interface TodosGridProps {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: TodosGridProps) => {
  const router = useRouter();

  const handleToggleTodo = async (id: string, complete: boolean) => {
    await todosApi.updateTodo(id, complete);
    router.refresh();
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {todos &&
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} toggleTodo={handleToggleTodo} />
          ))}
      </div>
    </>
  );
};
