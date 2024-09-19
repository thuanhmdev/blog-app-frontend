import Image from "next/image";
import { sendRequest } from "@/http/http";
import Link from "next/link";

const Header = async () => {
  const setting = await sendRequest<TResponse<TSetting>>({
    url: `/api/v1/settings`,
    method: "GET",
  });
  return (
    <>
      <header className="sticky top-0 z-[11] bg-white shadow-md py-2.5">
        <div className="container flex justify-between items-center h-full">
          <Link href="/" className="relative">
            <div className="h-[60px] w-[120px]">
              <Image
                className="object-contain object-left"
                alt="Logo"
                src={`${
                  setting.data.logo
                    ? `${process.env.NEXT_PUBLIC_BACKEND_STORAGE}/logo/${setting.data.logo}`
                    : "/images/logo.png"
                }`}
                fill
                priority
                quality={100}
              />
            </div>
          </Link>
          <ul className="flex flex-wrap items-center gap-4 m-0 text-lg lg:text-xl xl:text-2xl">
            <li>
              <Link href={setting.data.facebookLink ?? "#"}>
                <Image
                  width={25}
                  height={25}
                  src={"/images/facebook.svg"}
                  alt="facebook"
                  className="hover:scale-[1.1] transition-all ease-in-out duration-250"
                />
              </Link>
            </li>
            <li>
              <Link href={setting.data.instagramLink ?? "#"}>
                <Image
                  width={25}
                  height={25}
                  src={"/images/instagram.svg"}
                  alt="instagram"
                  className="hover:scale-[1.1] transition-all ease-in-out duration-250"
                />
              </Link>
            </li>
            <li>
              <Link href={setting.data.zaloLink ?? "#"}>
                <Image
                  width={25}
                  height={25}
                  src={"/images/zalo.svg"}
                  alt="zalo"
                  className="hover:scale-[1.1] transition-all ease-in-out duration-250"
                />
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
