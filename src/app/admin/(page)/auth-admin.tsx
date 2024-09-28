"use client";
import { sendRequest } from "@/http/http";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const AuthAdmin = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      sendRequest<TResponse<TBlog[]>>({
        url: `/blog-api/auth/logout`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        typeComponent: "CSR",
      });
      signOut({ callbackUrl: "/admin/login" });
    }
  }, [session?.error]);

  return <></>;
};

export default AuthAdmin;
