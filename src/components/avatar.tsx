import React from "react";
import DateFormat from "./date-format";
import Image from "next/image";

interface IAvatar {
  user: TUser;
  date?: number;
}

const Avatar = ({ user, date = 0 }: IAvatar) => {
  return (
    <>
      <div className="flex items-center gap-x-2 py-2">
        <div className="rounded-full relative overflow-hidden  bg-center bg-no-repeat bg-cover w-[40px] h-[40px] md:w-[40px] md:h-[40px] xl:w-[48px] xl:h-[48px]">
          {user && (
            <Image
              src={
                user.role.name === "ADMIN"
                  ? `${process.env.NEXT_PUBLIC_ENDPOINT_STORAGE}${user.image}`
                  : user.imageProvider
              }
              alt="avatar"
              fill
              className="object-cover"
              sizes="20vw"
            />
          )}
        </div>

        <div>
          <p className="text-blue-500 font-semibold text-xs md:text-sm xl:text-base">
            {user.name ?? "Khách"}
            {user.role.name === "ADMIN" && (
              <span className="px-1 text-[10px] ml-2 py-1 bg-yellow-500 text-white rounded-md">
                Tác giả
              </span>
            )}
          </p>
          {date > 0 && <DateFormat date={date} />}
        </div>
      </div>
    </>
  );
};

export default Avatar;
