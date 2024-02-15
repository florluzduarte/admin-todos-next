import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <div className="grid gap-6">
        <h1 className="font-bold text-xl">Dashboard Page</h1>
        <div className="flex flex-col bg-white p-6 rounded-md max-w-fit">
          <h2 className="font-bold">User Data:</h2>
          <p>{session.user?.name}</p>
          <p>{session.user?.email}</p>
          <p>{session.user?.image}</p>
        </div>
      </div>
    </div>
  );
}
