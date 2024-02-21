// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { getUserSessionServer } from "@/auth/actions/auth-actions";
import { Sidebar, TopMenu } from "@/components";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = getUserSessionServer();
  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <Sidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />
        <div className="px-6 pt-6">{children}</div>
      </div>
    </>
  );
}
