import { sendRequest } from "@/http/http";
import React from "react";
import Comment from "./comment";
import Link from "next/link";
import Image from "next/image";
import DateFormat from "@/components/date-format";
import { Metadata, ResolvingMetadata } from "next";
import { convertURL, getIdFromSlug } from "@/utils/urlUtil";
import ShareSocialMedia from "@/components/share-social-media";
import Avatar from "@/components/avatar";
import ErrorPage from "@/components/error-page";

interface TProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: TProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { statusCode, data } = await sendRequest<TResponse<TBlog>>({
    url: `/blog-api/blogs/${getIdFromSlug(params.slug)}`,
    method: "GET",
  });

  const siteName = (await parent).openGraph?.siteName;
  const locale = (await parent).openGraph?.locale;

  if (statusCode === 200) {
    return {
      title: data.title,
      description: data.description,
      keywords: data?.keyword ? data.keyword.split(",") : [],

      openGraph: {
        title: data.title,
        description: data.description,
        type: "article",
        authors: [`${data.blogger.name}`],
        locale: locale,
        tags: data?.keyword ? data.keyword.split(",") : [],
        siteName: siteName,
        images: [
          `${
            data.image
              ? `${process.env.NEXT_PUBLIC_ENDPOINT_STORAGE}${data.image}`
              : `${process.env.NEXT_PUBLIC_ENDPOINT_CSR_COMPONENT}/images/default_blog.jpg`
          }`,
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: data.title,
        description: data.description,
        creator: data.blogger.name,
        images: [`${process.env.NEXT_PUBLIC_ENDPOINT_STORAGE}${data.image}`],
      },
    };
  } else {
    return {
      title: "Blog not found",
      description: "",
      openGraph: {
        title: "Blog not found",
        description: "",
        images: ["/images/no-result.gif"],
      },
    };
  }
}

const page = async ({ params }: any) => {
  try {
    const [blog, topBlogs] = await Promise.all([
      sendRequest<TResponse<TBlog>>({
        url: `/blog-api/blogs/${getIdFromSlug(params.slug)}`,
        method: "GET",
      }),
      sendRequest<TResponse<TBlog[]>>({
        url: `/blog-api/blogs/recent`,
        method: "GET",
      }),
    ]);

    return (
      <div className="container py-10 min-h-[100vh]">
        {blog.data ? (
          <>
            <div className="grid grid-cols-3 relative gap-x-8">
              <div className="col-span-2">
                <h1 className="text-2xl md:text-3xl  xl:text-4xl font-bold">
                  {blog?.data.title}
                </h1>
                <div className="flex items-center pt-5 justify-between mb-1">
                  <Avatar user={blog.data.blogger} />
                  <p className="text-xs block md:inline">
                    Ngày đăng: <DateFormat date={blog.data.createdAt} />
                  </p>
                </div>
                <ShareSocialMedia title={blog.data.title} />
                <div
                  className="my-4"
                  dangerouslySetInnerHTML={{ __html: blog.data.content }}
                ></div>

                <div className="w-full h-[1px] bg-blue-500"></div>
                <Comment blogData={blog.data} />
              </div>
              <div>
                <div className="sticky top-[80px]">
                  <h2 className="font-bold">Các bài viết gần đây</h2>
                  <ul className="mt-4 space-y-2">
                    {topBlogs.data.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`/${convertURL(item.title)}-uuid-${item.id}`}
                          className="flex gap-4 cursor-pointer transition duration-300 hover:-translate-y-[2px]  hover:scale-[101%] hover:shadow-md"
                        >
                          <div className="">
                            <div className="h-[120px] w-[160px] rounded-2xl overflow-hidden relative">
                              <Image
                                src={
                                  item.image
                                    ? `${process.env.NEXT_PUBLIC_ENDPOINT_STORAGE}${item.image}`
                                    : "/images/default_blog.jpg"
                                }
                                alt="Blog Image"
                                sizes="160px"
                                fill
                                objectFit="cover"
                              />
                            </div>
                          </div>
                          <div className="py-2 flex flex-col gap-y-1.5 lg:gap-y-2.5">
                            <h2 className="md:text-base text-xl font-bold">
                              {item.title}
                            </h2>

                            <p className="text-xs block md:inline">
                              Ngày đăng: {<DateFormat date={item.createdAt} />}
                            </p>
                            <div>
                              <button className="bg-blue-500 hover:bg-blue-700 hover:-rotate-1 transition duration-300 text-white font-bold text-xs md:text-sm py-1 px-3 rounded-md">
                                Chi tiết
                              </button>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Image
              className="mx-auto"
              src="/images/no-result.gif"
              height={400}
              width={400}
              alt="NotFound"
            />
            <p className="text-center">
              Xin lỗi bài viết này không còn tồn tại
            </p>
          </>
        )}
      </div>
    );
  } catch (error) {
    return <ErrorPage />;
  }
};

export default page;
