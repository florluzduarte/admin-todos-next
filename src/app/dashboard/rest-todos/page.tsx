import { TodosGrid } from "@/todos";
import prisma from "../../../lib/prisma";

export const metadata = {
  title: "Lista de TODOs",
  description: "Listado de tareas realizado con una RESTapi",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div>
      <TodosGrid todos={todos} />
    </div>
  );
}
