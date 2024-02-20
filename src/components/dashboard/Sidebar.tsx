import Image from "next/image";
import Link from "next/link";
import { LogoutButton, SidebarItem } from "..";
import { ItemProps } from "./SidebarItem";
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorking,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const menuItems: ItemProps[] = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline />,
    title: "REST todos",
    path: "/dashboard/rest-todos",
  },
  {
    icon: <IoListOutline />,
    title: "Server actions",
    path: "/dashboard/server-todos",
  },
  {
    icon: <IoCodeWorking />,
    title: "Cookies",
    path: "/dashboard/cookies",
  },
  {
    icon: <IoBasketOutline />,
    title: "Productos",
    path: "/dashboard/products",
  },
  {
    icon: <IoPersonOutline />,
    title: "Perfil",
    path: "/dashboard/profile",
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            <Link href="/dashboard" title="home">
              <Image
                src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
                width={128}
                height={36}
                className="w-32"
                alt="tailus logo"
              />
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Image
              src={
                session.user?.image ??
                "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
              }
              alt="Profile picture"
              width={80}
              height={80}
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-20 lg:h-20"
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              {session.user?.name ?? "No name"}
            </h5>
            <span className="hidden text-gray-400 lg:flex lg:gap-2 lg:justify-center">
              {
                session.user?.roles?.map((role) => (
                  <p key={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</p>
                ))
              }
            </span>
          </div>

          <ul className="space-y-2 tracking-wide mt-4">
            {menuItems.map((item: ItemProps) => (
              <SidebarItem key={item.path} {...item} />
            ))}
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-2 flex justify-between items-center border-t">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
};
