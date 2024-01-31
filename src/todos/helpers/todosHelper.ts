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
    console.log(dataTodo);
    return dataTodo;
}

export const createTodo = async (description: string, complete: boolean = false): Promise<Todo> => {
    const body = { description: description }
    const respTodo = await fetch(`http://localhost:3000/api/todos`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const createdTodo = await respTodo.json();
    console.log(createdTodo);
    return createdTodo;
}

export const deleteCompletedTodos = async (): Promise<void> => {
    const respTodo = await fetch("http://localhost:3000/api/todos", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const deletedTodo = await respTodo.json();
    console.log(deletedTodo);
    return deletedTodo;
}