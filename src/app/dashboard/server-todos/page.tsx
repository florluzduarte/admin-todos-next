export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NewTodo, TodosGrid } from "../../../todos";
import prisma from "../../../lib/prisma";

export const metadata = {
  title: "Lista de Server actions TODOs",
  description: "Listado de tareas realizado con server actions",
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <>
      <span className="text-xl font-bold mb-6">Server Actions TODOs</span>
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
