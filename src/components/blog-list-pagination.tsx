/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RCPagination from "./blog-pagination";

interface IProps {
  total: number;
}
const BlogListPagination = ({ total = 0 }: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChangePage = (p: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", p.toString());
    router.replace(`/?page=${p}`, { scroll: false });
  };

  return (
    <>
      {total > 0 && (
        <>
          <div className="py-2">
            <div className="border-t my-4"></div>
            <div className="flex justify-end">
              <RCPagination
                pageSize={10}
                onChangePage={handleChangePage}
                current={Number(searchParams.get("page") ?? 1)}
                total={total}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BlogListPagination;
