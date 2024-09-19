"use client";
import { sendRequest } from "@/http/http";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const AuthAdmin = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "AdminRefreshAccessTokenError") {
      sendRequest<TResponse<TBlog[]>>({
        url: `/api/v1/auth/logout`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      signOut({ callbackUrl: "/admin/login" });
    }
  }, [session?.error]);

  return <></>;
};

export default AuthAdmin;
