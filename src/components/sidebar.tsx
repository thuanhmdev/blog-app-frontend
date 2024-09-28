"use client";
import { sendRequest } from "@/http/http";
import {
  LogOut,
  MessageSquareMore,
  NotepadTextDashed,
  Settings,
  UserRoundPen,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "" });
    sendRequest<TResponse<TBlog[]>>({
      url: `/blog-api/auth/logout`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      typeComponent: "CSR",
    });
  };

  // const router = useRouter();
  const menuItems = [
    {
      id: "blog",
      title: "Blog",
      icon: NotepadTextDashed,
      url: "/admin/blog",
    },
    {
      id: "comment",
      title: "Comment",
      icon: MessageSquareMore,
      url: "/admin/comment",
    },
    {
      id: "setting",
      title: "Setting Page",
      icon: Settings,
      url: "/admin/setting",
    },
  ];

  return (
    <div className="sticky top-0 h-screen bg-[#2a3f54]">
      <div className="h-full flex flex-col p-2">
        <h3 className="font-bold text-gray-200 text-2xl">Admin</h3>
        <div className="grow">
          <div className="py-2">
            {menuItems.map((item) => {
              return (
                <Link
                  href={item.url}
                  key={item.id}
                  className={`my-1.5 p-2 flex items-center hover:bg-slate-600 hover:rounded-xl cursor-pointer ${
                    pathname.includes(item.url) && "bg-slate-600 rounded-xl"
                  } `}
                >
                  <item.icon className="text-xl" />
                  <span className="ms-3 text-sm lg:text-base">
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <Link
          className="p-2 flex items-center hover:bg-slate-600 hover:rounded-xl cursor-pointer"
          href={"/admin/infor"}
        >
          <UserRoundPen className="text-xl" />
          <p className="ms-3 md:text-sm lg:text-base font-semibold">Admin</p>
        </Link>
        <div
          className="p-2 flex items-center hover:bg-slate-600 hover:rounded-xl cursor-pointer"
          onClick={handleSignOut}
        >
          <LogOut className="text-xl" />
          <p className="ms-3 md:text-sm lg:text-base font-semibold">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
