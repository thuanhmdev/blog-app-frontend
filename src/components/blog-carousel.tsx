"use client";
import { convertURL } from "@/utils/urlUtil";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Slider, { Settings } from "react-slick";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/vi";
import useMounted from "@/hooks/use-mounted";

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="bg-blue-500/50 p-1 rounded-md absolute left-10 top-[120px] z-10"
      onClick={onClick}
    >
      <ChevronLeft className="text-neutral-50" />
    </button>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="bg-blue-500/50 p-1 rounded-md absolute right-10 top-[120px]"
      onClick={onClick}
    >
      <ChevronRight className="text-neutral-50" />
    </button>
  );
};

interface IProps {
  blogs: TBlog[];
}

const BlogCarousel = ({ blogs = [] }: IProps) => {
  const hasMounted = useMounted();
  const router = useRouter();
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const convertTimeStampeToDate = (timeStampDate: number) => {
    return dayjs(timeStampDate).format("MMM D, YYYY h:mm A");
  };

  const handleNavigate = (blog: TBlog) => {
    router.push(`blog/${convertURL(blog.title)}-${blog.id}`);
  };

  return (
    <div className="overflow-hidden rounded-lg">
      {blogs.length === 1 ? (
        <div>
          <div className="relative w-full h-[300px] p-2  bg-center bg-no-repeat bg-cover">
            <Image
              src="/images/blog_caurousel.jpg"
              alt="Blog Image"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-neutral-800/45"></div>
            <div className="relative z-1 h-full flex flex-col justify-center items-center gap-y-3 ">
              <h3
                className="text-xl lg:text-2xl xl:text-3xl text-white font-bold cursor-pointer"
                onClick={() => handleNavigate(blogs?.[0])}
              >
                {blogs?.[0].title ?? ""}
              </h3>
              <div className="flex flex-col items-center gap-y-2">
                <p className="mb-0 text-white">
                  Ngày đăng:{" "}
                  {hasMounted && convertTimeStampeToDate(blogs?.[0].createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Slider {...settings}>
          {blogs.map((item: TBlog) => (
            <React.Fragment key={item.id}>
              <div>
                <div className="relative w-full h-[300px] p-2  bg-center bg-no-repeat bg-cover">
                  <Image
                    src="/images/blog_caurousel.jpg"
                    alt="Blog Image"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-neutral-800/45"></div>
                  <div className="relative z-1 h-full flex flex-col justify-center items-center gap-y-3 ">
                    <h3
                      className="text-xl lg:text-2xl xl:text-3xl text-white font-bold cursor-pointer"
                      onClick={() => handleNavigate(item)}
                    >
                      {item.title ?? ""}
                    </h3>
                    <div className="flex flex-col items-center gap-y-2">
                      <p className="mb-0 text-white">
                        {item.blogger.name ?? ""}
                      </p>
                      <p className="mb-0 text-white">
                        Ngày đăng:{" "}
                        {hasMounted && convertTimeStampeToDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default BlogCarousel;
