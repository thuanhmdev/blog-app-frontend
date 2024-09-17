"use client";
import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const ScrollTop = () => {
  return (
    <div
      onClick={() =>
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      }
      className={` h-[40px] px-2 rounded-full flex justify-center items-center border-blue-200 border-2 bottom-[100px] right-4 text-blue-500 text-xl cursor-pointer hover:text-2xl hover:bg-blue-100 transition-all duration-100 `}
    >
      <ChevronUp /> <p className="text-[12px]">Back to top</p>
    </div>
  );
};

export default ScrollTop;
