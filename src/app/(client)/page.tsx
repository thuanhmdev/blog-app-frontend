import BlogCarousel from "@/components/blog-carousel";
import BlogListPagination from "@/components/blog-list-pagination";
import DateFormat from "@/components/date-format";
import Loading from "@/components/loading";
import { sendRequest } from "@/http/http";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Suspense } from "react";
import { authOptions } from "../api/auth/auth.option";
import Image from "next/image";
import { convertURL } from "@/utils/urlUtil";

const HomePage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const session = await getServerSession(authOptions);
  const [topBlogs, blogs, contact] = await Promise.all([
    sendRequest<TResponse<TBlog[]>>({
      url: `/api/v1/blogs/carousel`,
      method: "GET",
    }),
    sendRequest<TResponse<TPagination<TBlog[]>>>({
      url: `/api/v1/blogs-pagination`,
      method: "GET",
      queryParams: {
        size: 10,
        page: searchParams?.page ?? "1",
      },
    }),
    sendRequest<TResponse<TContact>>({
      url: `/api/v1/settings/contact`,
      method: "GET",
    }),
  ]);

  return (
    <div>
      <div className="container py-3">
        <h1 className="hidden">Kim Tuyền Blog</h1>

        <div>
          {topBlogs?.data?.length > 0 && (
            <BlogCarousel blogs={topBlogs?.data} />
          )}
          <div className="relative">
            <div className="grid grid-cols-12 gap-x-10 ">
              <div className="col-span-12 lg:col-span-9 space-y-4 lg:space-y-6">
                <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-0 mt-4 lg:mt-8">
                  Danh sách bài viết
                </h2>
                <Suspense fallback={<Loading />}>
                  {blogs.data.result.map((item) => (
                    <Link
                      href={`blog/${convertURL(item.title)}-uuid-${item.id}`}
                      key={item.id}
                      className="flex gap-4 cursor-pointer transition duration-300 hover:-translate-y-[2px]  hover:scale-[101%] hover:shadow-md"
                    >
                      <div className="">
                        <div className="child relative group-hover:scale(1.2) bg-center bg-cover bg-no-repeat w-[160px] h-[150px] md:w-[220px] md:h-[200px] lg:w-[260px] lg:h-[220px] xl:w-[290px] xl:h-[230px] rounded-2xl overflow-hidden">
                          <Image
                            src={
                              item.image
                                ? `${process.env.NEXT_PUBLIC_BACKEND_STORAGE}/blog/${item.image}`
                                : "/images/default_blog.jpg"
                            }
                            alt="Blog Image"
                            fill
                          />
                        </div>
                      </div>
                      <div className="py-2 flex flex-col gap-y-1.5 lg:gap-y-2.5">
                        <h2 className="text-sm md:text-base lg:text-xl xl:text-2xl font-bold">
                          {item.title}
                        </h2>

                        <div className="flex flex-col">
                          <div className="flex items-center gap-x-2">
                            <div
                              style={{
                                backgroundImage: `url(${item.blogger.picture})`,
                              }}
                              className="rounded-full  bg-center bg-no-repeat bg-cover w-[40px] h-[40px] md:w-[40px] md:h-[40px] xl:w-[48px] xl:h-[48px]"
                            ></div>
                            <p className="text-blue-600 font-semibold text-xs md:text-sm xl:text-base">
                              {item.blogger.name}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs block md:inline">
                          Ngày đăng: <DateFormat date={item.createdAt} />
                        </p>
                        <div>
                          <button className="bg-blue-600 hover:bg-blue-700 hover:-rotate-1 transition duration-300 text-white font-bold text-xs md:text-sm xl:text-base py-1 px-3 rounded-md">
                            Chi tiết
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <BlogListPagination total={blogs.data.meta.total} />
                </Suspense>
              </div>
              <div className="hidden mt-10 lg:block lg:col-span-3 space-y-4 lg:space-y-6">
                <div className="sticky top-[150px] space-y-4">
                  <div className="relative rounded-lg  bg-center bg-no-repeat bg-cover w-[40px] h-[40px] md:w-[40px] md:h-[40px] xl:w-full xl:h-[350px]">
                    <Image
                      src={contact?.data?.picture ?? ""}
                      alt="Blog Image"
                      fill
                      className="object-cover"
                    />
                    <p className="absolute font-bold bottom-0 bg-gray-600/50 text-neutral-50 px-2 text-center py-1 w-full">
                      {contact.data.name ?? "Admin"}
                    </p>
                  </div>

                  <ul className="space-y-1">
                    <li>
                      <Link
                        href={contact?.data?.facebookLink ?? "#"}
                        className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600/80 hover:scale-[101%] transition duration-100"
                      >
                        Facebook
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={contact?.data?.instagramLink ?? "#"}
                        className="block text-center bg-orange-500 text-white py-2 rounded-md hover:bg-blue-600/80 hover:scale-[101%] transition duration-100"
                      >
                        Instagram
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={contact?.data?.zaloLink ?? "#"}
                        className="block text-center bg-sky-500 text-white py-2 rounded-md hover:bg-blue-600/80 hover:scale-[101%] transition duration-100"
                      >
                        Zalo
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
