export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NewTodo, TodosGrid } from "@/todos";
import prisma from "../../../lib/prisma";
import { getUserSessionServer } from "@/auth/actions/auth-actions";

export const metadata = {
  title: "Lista de TODOs",
  description: "Listado de tareas realizado con una RESTapi",
};

export default async function RestTodosPage() {

  const user = await getUserSessionServer();

  const todos = await prisma.todo.findMany({
    where: { userId: user?.id },
    orderBy: { description: "asc" }
  });

  return (
    <div>
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
