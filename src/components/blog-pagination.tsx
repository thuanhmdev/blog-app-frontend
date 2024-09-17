"use client";
import React from "react";
import Pagination, { PaginationProps } from "rc-pagination";
import _ from "lodash";

interface IProps {
  pageSize: number;
  current: number;
  onChangePage: (p: number) => void;
  total: number;
}
const RCPagination = ({
  pageSize = 20,
  onChangePage,
  current = 1,
  total = 0,
}: IProps) => {
  const updatePage = (p: number) => {
    onChangePage(p);
  };

  return (
    <>
      <Pagination
        pageSize={pageSize}
        onChange={updatePage}
        current={current}
        total={total}
      />
    </>
  );
};

export default RCPagination;
