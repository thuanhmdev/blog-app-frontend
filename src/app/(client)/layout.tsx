import Footer from "@/components/footer";
import Header from "@/components/header";
import { sendRequest } from "@/http/http";
import { Metadata } from "next";
import React from "react";
import AuthUser from "./auth-user";

export async function generateMetadata(): Promise<Metadata> {
  const { data, statusCode } = await sendRequest<TResponse<TSetting>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/settings`,
    method: "GET",
  });
  if (statusCode === 200) {
    return {
      title: data.title,
      description: data.description,
      openGraph: {
        siteName: data.siteName,
        locale: "vi_VN",
      },
      // alternates: {
      //   canonical: "./",
      // },
    };
  } else {
    return {
      title: "Trang chủ",
      description:
        "Bạn muốn tìm hiểu về các bí quyết làm đẹp tự nhiên? Hãy ghé thăm blog của tôi!",
      openGraph: {
        locale: "vi_VN",
        siteName: "",
      },
    };
  }
}

const ClientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <AuthUser />
      <div className="min-h-[90vh]">{children}</div>
      <Footer />
    </>
  );
};

export default ClientLayout;
