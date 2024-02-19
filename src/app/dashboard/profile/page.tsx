"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {

    const {data: session} = useSession();

    useEffect(() => {
      console.log("Client side");
    }, [])
    

  return (
    <div>
      <div className="grid gap-6">
        <h1 className="font-bold text-xl">Profile Page - Client Side</h1>
        <div className="flex flex-col bg-white p-6 rounded-md max-w-fit">
          <h2 className="font-bold">User Data:</h2>
          <p>{session?.user?.name ?? "No name"}</p>
          <p>{session?.user?.email ?? "No email"}</p>
          <p>{session?.user?.image ?? "No image"}</p>
        </div>
      </div>
    </div>
  );
}