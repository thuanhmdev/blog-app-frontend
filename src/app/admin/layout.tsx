import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Giao diện đành cho Admin",
};
const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

export default AdminLayout;
