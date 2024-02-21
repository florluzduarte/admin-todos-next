"use server";

import { Todo } from "@prisma/client";
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { getUserSessionServer } from "@/auth/actions/auth-actions";


export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
    const user = await getUserSessionServer();
    const todo = await prisma.todo.findUnique({ where: { id: id, userId: user!.id } });

    if (!todo) {
        throw new Error(`No se encontró un TODO con el id: ${id}`);
    }

    const updatedTodo = await prisma.todo.update({
        where: { id: id, userId: user!.id },
        data: { complete: complete }
    });

    revalidatePath("/dashboard/server-todos");
    return updatedTodo;
}

export const addTodo = async (description: string) => {
    const user = await getUserSessionServer();
    try {
        const newTodo = await prisma.todo.create({ data: { description, userId: user!.id } });
        revalidatePath("/dashboard/server-todos");
        return newTodo;

    } catch (error) {
        return {
            message: "No fue posible crear el nuevo todo"
        }
    }
}

export const deleteTodo = async (): Promise<void> => {
    const user = await getUserSessionServer();
    try {
        await prisma.todo.deleteMany({
            where: { complete: true, userId: user!.id }
        });
        revalidatePath("/dashboard/server-todos");
    } catch (error) {
        console.log(error);
    }
}