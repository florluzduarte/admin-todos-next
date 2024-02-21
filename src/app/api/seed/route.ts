import { NextResponse, NextRequest } from 'next/server'
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {

  await prisma.todo.deleteMany(); //Cuidado que esto se carga la base de datos = delete * from todo
  await prisma.user.deleteMany(); //Cuidado que esto borra todos los usuarios, solo usar para preparar la DB

  const user = await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("123456"),
      roles: ["test-user"],
      todos: {
        create: [
          {
            description: "Piedra del alma",
            complete: true,
          },
          { description: "Piedra del poder" },
          { description: "Piedra del tiempo" },
          { description: "Piedra del espacio" },
          { description: "Piedra de la realidad" }
        ]
      }
    }
  })

  return NextResponse.json({
    message: "Seed executed"
  })
}