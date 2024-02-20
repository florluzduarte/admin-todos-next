import { NextResponse, NextRequest } from 'next/server'
import prisma from "@/lib/prisma";
import * as yup from "yup";

interface Segments {
    params: {
        id: string,
    }
}

export async function GET(request: Request, segments: Segments) {

    const todoId = segments.params.id;

    const todoById = await prisma.todo.findUnique({ where: { id: todoId } });

    if (todoById === null) {
        return NextResponse.json({
            msg: "El ID solicitado no existe",
            method: "GET"
        }, { status: 404 })
    }

    return NextResponse.json({
        msg: "ok",
        method: "GET",
        data: todoById,
    })
}


const putYupSchema = yup.object({
    description: yup.string().optional().min(2),
    complete: yup.boolean().optional(),
})

export async function PUT(request: Request, segments: Segments) {
    const todoId = segments.params.id;

    const todoById = await prisma.todo.findUnique({ where: { id: todoId } });

    if (todoById === null) {
        return NextResponse.json({
            msg: "El ID solicitado no existe",
            method: "GET"
        }, { status: 404 })
    }

    try {
        const { description, complete } = await putYupSchema.validate(await request.json());

        const updatedTodo = await prisma.todo.update({
            where: { id: todoId },
            data: { description, complete }
        });

        return NextResponse.json({
            msg: "Todo actualizado",
            method: "GET",
            data: updatedTodo,
        })

    } catch (error) {
        return NextResponse.json({
            msg: error,
            method: "PUT",
        }, { status: 400 })
    }

}