"use client";
import { sendRequest } from "@/http/http";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";

const AuthUser = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "UserRefreshAccessTokenError") {
      sendRequest<TResponse<TBlog[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      signOut();
    }
  }, [session?.error]);

  return <></>;
};

export default AuthUser;
