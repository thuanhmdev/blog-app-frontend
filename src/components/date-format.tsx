"use client";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/vi";

const DateFormat = ({ date }: { date: number }) => {
  return (
    <i className="block text-[12px]">
      {`${dayjs(date).locale("vi").format("DD/MM/YYYY h:mm A")} (${dayjs(
        dayjs(date).locale("vi")
      ).fromNow()})`}
    </i>
  );
};

export default DateFormat;
