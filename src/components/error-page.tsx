import Image from "next/image";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="container min-h-[100vh] flex justify-center align-center">
      <Image src={"/images/error.svg"} alt="avatar" width={200} height={200} />
      <h1 className="text-xl font-bold text-center">
        Sorry, an error occurred, please come back later
      </h1>
    </div>
  );
};

export default ErrorPage;
