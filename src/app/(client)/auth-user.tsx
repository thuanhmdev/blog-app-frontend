"use client";
import { sendRequest } from "@/http/http";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";

const AuthUser = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "refreshAccessTokenError") {
      sendRequest<void>({
        url: `/blog-api/auth/logout`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        typeComponent: "CSR",
      });
      signOut({ callbackUrl: "" });
    }
  }, [session?.error]);

  return <></>;
};

export default AuthUser;
