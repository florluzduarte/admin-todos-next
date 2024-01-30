import Link from "next/link";
import { CiBookmarkCheck } from "react-icons/ci";

export const SidebarItem = () => {
  return (
    <>
      {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
      <li>
        <Link
          href="/dashboard"
          className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
        >
          <CiBookmarkCheck size={30} />
          <span className="-mr-1 font-medium">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/rest-todos"
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
        >
          <CiBookmarkCheck size={30} />
          <span className="group-hover:text-gray-700">Categories</span>
        </Link>
      </li>
    </>
  );
};
