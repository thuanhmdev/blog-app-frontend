import Image from "next/image";
import ScrollTop from "./scroll-top";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer id="footer" className="bg-gray-100 py-6">
        <div className="container flex justify-between">
          <p className="text-black text-sm text-center mt-4">
            Copyright © 2024, Skinlab by Tuyen
          </p>
          <div className="flex justify-between">
            <ul className="flex flex-wrap items-center gap-4 m-0 text-lg lg:text-xl xl:text-2xl">
              <li>
                <Link href="#">
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
                <Link href="#">
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
                <Link href="#">
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
          <ScrollTop />
        </div>
      </footer>
    </>
  );
};

export default Footer;
