import { NextResponse, NextRequest } from 'next/server'
import prisma from "@/lib/prisma";

export async function GET(request: Request) {

    await prisma.todo.deleteMany(); //Cuidado que esto se carga la base de datos = delete * from todo

    const todo = await prisma.todo.createMany({
        data: [
            {
                description: "Piedra del alma",
                complete: true,
            },
            { description: "Piedra del poder" },
            { description: "Piedra del tiempo" },
            { description: "Piedra del espacio" },
            { description: "Piedra de la realidad" }
        ]
    })

    return NextResponse.json({
        message: "Seed executed"
    })
}