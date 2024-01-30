# Admin Todos

Es una To-Do App realizada en el [curso de Next13 de Fernando Herrera](https://cursos.devtalles.com/courses/nextjs) utilizando Next.js, Prima, PostgreSQL, Docker y TablePlus

## Development

Pasos para levantar la app en modo Desarrollo

1. Crear imagen de Docker para la base de datos

```
docker compose up -d
```

2. Copiar el archivo .env.template, y renombrarlo a .env
3. Dentro del archivo .env escribir correctamente las variables de entorno a utilizar siguiendo el template provisto
4. No olvidar colocar el archivo .env en .gitignore para que no se filtren datos sensibles
5. Correr el comando `npm install` para regenerar los Node Modules
6. Levantar el servidor de desarrollo con el comando `npm run dev`
7. Ejecutar estos comandos de Prisma

```
npx prisma migrate dev
npx prisma generate
```

8. Ejecutar el SEED [para crear la base de datos local](http://localhost:3000/api/seed)

## Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
