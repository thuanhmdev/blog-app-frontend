import React from "react";

const Loading = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div
        className="w-12 h-12 rounded-full animate-spin
          border-4 border-solid border-blue-500 border-t-transparent"
      ></div>
    </div>
  );
};

export default Loading;
