"use client";

import { Todo } from "@prisma/client";
import { TodoItem } from "..";

// -----------
// IMPORTANT: Importaciones necesarias para helpers y RESTapi
//import * as todosApi from "@/todos/helpers/todosHelper";
//import { useRouter } from "next/navigation";
// -----------

// -----------
// IMPORTANT: Importacion para Server Actions
import { toggleTodo } from "../actions/todos-actions";
// -----------

interface TodosGridProps {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: TodosGridProps) => {
  // Forma de actualizar la base de datos usando helpers y RESTapi
  // const router = useRouter();

  // const handleToggleTodo = async (id: string, complete: boolean) => {
  //   await todosApi.updateTodo(id, complete);
  //   router.refresh();
  // };

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {todos &&
          todos.map((todo) => (
            // Con RESTapi y handlers
            //<TodoItem key={todo.id} todo={todo} toggleTodo={handleToggleTodo} />

            // Con server actions
            <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
          ))}
      </div>
    </>
  );
};
