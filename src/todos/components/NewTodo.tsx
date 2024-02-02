"use client";

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

// -----------
// IMPORTANT: Importaciones necesarias para helpers y RESTapi
// import * as todosApi from "@/todos/helpers/todosHelper";
// import { useRouter } from "next/navigation";
// -----------

// -----------
// IMPORTANT: Importacion para Server Actions
import { addTodo, deleteTodo } from "../actions/todos-actions";
// -----------

export const NewTodo = () => {
  // Se usa para trabajar con RESTapi y handlers
  // const router = useRouter();

  const [description, setDescription] = useState("");

  const handleInputChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (description.trim().length === 0) return;
    await addTodo(description);
    setDescription("");
    //router.refresh();
  };

  const handleDelete = async () => {
    // Para RESTapi y handlers
    //await todosApi.deleteCompletedTodos();
    //router.refresh();

    deleteTodo();
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <input
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesitas resolver?"
        value={description}
        onChange={handleInputChange}
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={handleDelete}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        <span className="ml-2">Delete Completed Todos</span>
      </button>
    </form>
  );
};
