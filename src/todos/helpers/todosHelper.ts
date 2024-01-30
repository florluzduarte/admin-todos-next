import { Todo } from "@prisma/client";

export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {
    const body = { complete: complete }
    const respTodo = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const dataTodo = await respTodo.json();
    return dataTodo;
}