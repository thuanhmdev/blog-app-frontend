"use client";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/vi";
import useMounted from "@/hooks/use-mounted";

const DateFormat = ({ date }: { date: number }) => {
  const hasMounted = useMounted();
  return hasMounted ? (
    <i className="block text-[12px]">
      {`${dayjs(date).locale("vi").format("DD/MM/YYYY h:mm A")} (${dayjs(
        dayjs(date).locale("vi")
      ).fromNow()})`}
    </i>
  ) : (
    <></>
  );
};

export default DateFormat;
