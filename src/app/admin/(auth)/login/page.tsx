import { authOptions } from "@/app/api/auth/auth.option";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";

const AdminLogin = async () => {
  const session = await getServerSession(authOptions);
  if (session && session.user.role.name === "ADMIN") {
    redirect("/admin/blog");
  }
  return (
    <>
      <div className="bg-sky-100 h-screen w-screen ">
        <div className="container h-full w-full flex items-center justify-center">
          <div className="w-[90%] lg:w-4/5 grid grid-cols-1 md:grid-cols-2 place-items-center gap-x-10 bg-neutral-50 shadow-lg p-10 rounded-2xl -translate-y-20 md:translate-y-0 ">
            <Image
              src="/images/admin-login.svg"
              alt="admin-login"
              width={500}
              height={500}
              className="hidden md:block"
            ></Image>
            <div className="w-full">
              <h1 className="text-[25px] md:text-[30px] lg:text-[35px] xl:text-[40px] font-bold text-center mb-10">
                Welcome, Admin
              </h1>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
