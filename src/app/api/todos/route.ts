import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import * as yup from "yup";
import { getUserSessionServer } from '@/auth/actions/auth-actions';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const take = Number(searchParams.get("take") ?? "10"); //Convierto el string a number
    const skip = Number(searchParams.get("skip") ?? "0");

    if (isNaN(take)) {
        return NextResponse.json({
            msg: "Take debe ser un número"
        }, {
            status: 400
        })
    }

    if (isNaN(skip)) {
        return NextResponse.json({
            msg: "Skip debe ser un número"
        }, {
            status: 400
        })
    }

    const todos = await prisma.todo.findMany({
        take: take,
        skip: skip,
    });

    return NextResponse.json({
        msg: "ok",
        method: "GET",
        data: todos,
    })
}


const postYupSchema = yup.object({
    description: yup.string().required().min(2),
    complete: yup.boolean().optional().default(false),
})

export async function POST(request: Request) {

    const user = await getUserSessionServer();
    if (!user) {
        return NextResponse.json({
            msg: "No autorizado",
            method: "POST"
        }, { status: 401 });
    }

    try {
        const { description, complete, ...res } = await postYupSchema.validate(await request.json());

        if (Object.keys(res).length) {
            return NextResponse.json({
                msg: "Las únicas propiedades permitidas son description y complete",
                method: "POST",
            }, { status: 400 })
        }

        const newTodo = await prisma.todo.create({ data: { description, complete, userId: user!.id } })

        return NextResponse.json({
            msg: "ok",
            method: "POST",
            data: newTodo,
        })

    } catch (error) {
        return NextResponse.json({
            msg: error,
            method: "POST"
        }, { status: 400 })
    }
}

export async function DELETE(request: Request) {

    try {
        await prisma.todo.deleteMany({ where: { complete: true } });

        return NextResponse.json({
            msg: "ok",
            method: "DELETE",
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            msg: error,
            method: "DELETE",
        }, { status: 400 })
    }
}