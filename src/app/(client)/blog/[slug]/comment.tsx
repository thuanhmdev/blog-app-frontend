"use client";
import DateFormat from "@/components/date-format";
import { sendRequest } from "@/http/http";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Comment = ({ blogId }: { blogId: string }) => {
  // signOut();
  const [comments, setComments] = useState<TComment[]>([]);
  const [writeComment, setWriteComment] = useState("");
  const [writeAnswerComment, setWriteAnswerComment] = useState({
    content: "",
    rootId: "",
    replyToUserId: "",
  });
  const { data: session } = useSession();

  const handleGetComments = async () => {
    if (!blogId) return;
    const { statusCode, data } = await sendRequest<TResponse<TComment[]>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/comments/${blogId}`,
      method: "GET",
    });
    console.log(data);
    if (statusCode >= 200 && statusCode <= 299 && data) {
      const listParent = data.filter((i: TComment) => !i.rootId);
      const finalList = listParent.map((item: TComment) => {
        const listChilren = data.filter(
          (itemFilter) => itemFilter.rootId === item.id
        );
        item.answers = listChilren.sort((a, b) => a.createdAt - b.createdAt);
        return item;
      });

      setComments(finalList);
    }
  };

  useEffect(() => {
    handleGetComments();
  }, [blogId]);

  const handleWriteComment = async ({
    content = "",

    replyToUserId = "",
  }) => {
    if (!content) return;

    const { statusCode, data } = await sendRequest<TResponse<TComment[]>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/comments`,
      method: "POST",
      body: {
        content: content,
        blog: { id: blogId },
        user: { id: session?.user.id },
        rootId: writeAnswerComment.rootId ?? "",
        replyToUser: { id: writeAnswerComment.replyToUserId ?? "" },
      },
    });
    if (statusCode === 201) {
      toast.success("Gửi bình luận thành công");
      handleGetComments();
      setWriteComment("");
      setWriteAnswerComment({ content: "", rootId: "", replyToUserId: "" });
    }
  };
  console.log(session);
  return (
    <>
      <div className="pt-3 bg-white rounded space-y-2">
        <h2 className="text-xl font-bold">Bình luận</h2>
        {session?.error}
        {!session?.error && (
          <div className="w-full py-8 flex flex-col justify-center items-center bg-slate-50">
            <i className="text-center py-2">
              Đăng nhập để thảo luận bài viết này
            </i>
            <ul className="flex flex-wrap items-center gap-4 m-0 text-lg lg:text-xl xl:text-2xl">
              <li>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    signIn("google", { callbackUrl: `/blog/${blogId}` })
                  }
                >
                  <Image
                    width={25}
                    height={25}
                    src={"/images/google.svg"}
                    alt="facebook"
                    className="hover:scale-[1.1] transition-all ease-in-out duration-250"
                  />
                </div>
              </li>
              <li>
                <div
                  className="cursor-pointer"
                  onClick={() => signIn("facebook")}
                >
                  <Image
                    width={25}
                    height={25}
                    src={"/images/facebook.svg"}
                    alt="facebook"
                    className="hover:scale-[1.1] transition-all ease-in-out duration-250"
                  />
                </div>
              </li>
            </ul>
          </div>
        )}

        {session && (
          <div>
            <div className="flex items-center gap-x-2 py-2">
              <div
                className="rounded-full  bg-center bg-no-repeat bg-cover w-[40px] h-[40px] md:w-[40px] md:h-[40px] xl:w-[48px] xl:h-[48px]"
                style={{
                  backgroundImage: `url(${session.user.picture})`,
                }}
              ></div>
              <p className="text-blue-500 font-semibold text-xs md:text-sm xl:text-base">
                {session?.user?.name ?? "Khách"}
              </p>
            </div>
            <textarea
              className="border focus:outline-blue-200 p-2 rounded w-full"
              placeholder="Bình luận về bài viết..."
              value={writeComment}
              onChange={(e) => setWriteComment(e.target.value)}
            ></textarea>

            <div>
              <button
                onClick={() => handleWriteComment({ content: writeComment })}
                className="px-4 py-1.5 bg-blue-500 text-white rounded font-light hover:bg-blue-700"
              >
                Gửi
              </button>
            </div>
          </div>
        )}

        <hr></hr>
        <div>
          {comments.map((item: TComment) => (
            <div key={item.id} className="py-4">
              <div className="flex items-center gap-x-2 pt-2">
                <div
                  className="rounded-full  bg-center bg-no-repeat bg-cover w-[40px] h-[40px] md:w-[40px] md:h-[40px] xl:w-[48px] xl:h-[48px]"
                  style={{
                    backgroundImage: `url(${item.user.picture})`,
                  }}
                ></div>
                <div>
                  <p className="text-blue-500 font-semibold text-xs md:text-sm xl:text-base">
                    {item?.user?.name ?? "Khách"}
                  </p>
                  <DateFormat date={item.createdAt} />
                </div>
              </div>
              <div className="ml-[55px] ">
                <p className="bg-gray-50 p-2 ">{item.content}</p>
              </div>
              <div className="ml-[55px] ">
                {session && (
                  <button
                    type="button"
                    className="text-[14px]  text-sky-500 mt-1"
                    onClick={() =>
                      setWriteAnswerComment((prev) => ({
                        ...prev,
                        rootId: item.id,
                        userId: session.user.id,
                        content: "",
                      }))
                    }
                  >
                    Trả lời
                  </button>
                )}
              </div>
              {item.answers.map((item2: TComment) => (
                <div key={item2.id} className="ml-[55px]">
                  <div className="flex items-center gap-x-2 pt-2">
                    <div
                      className="rounded-full  bg-center bg-no-repeat bg-cover w-[40px] h-[40px] md:w-[40px] md:h-[40px] xl:w-[48px] xl:h-[48px]"
                      style={{
                        backgroundImage: `url(${item2.user.picture})`,
                      }}
                    ></div>
                    <div>
                      <p className="text-blue-500 font-semibold text-xs md:text-sm xl:text-base">
                        {item2?.user?.name ?? "Khách"}
                      </p>
                      <DateFormat date={item2.createdAt} />
                    </div>
                  </div>
                  <div className="ml-[55px] ">
                    <p className="bg-gray-50 p-2 ">{item2.content}</p>
                  </div>
                  <div className="ml-[55px] ">
                    {session && (
                      <button
                        type="button"
                        className="text-[14px]  text-sky-500 mt-1"
                        onClick={() =>
                          setWriteAnswerComment((prev) => ({
                            ...prev,
                            rootId: item.id,
                            userId: session.user.id,
                            content: `(@${item2.user.name}): `,
                            replyToUserId: item2.user.id,
                          }))
                        }
                      >
                        Trả lời
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {session && writeAnswerComment.rootId === item.id && (
                <div className="ml-[55px] ">
                  <div className="flex items-center gap-x-2 py-2">
                    <div
                      className="rounded-full  bg-center bg-no-repeat bg-cover w-[40px] h-[40px] md:w-[40px] md:h-[40px] xl:w-[48px] xl:h-[48px]"
                      style={{
                        backgroundImage: `url(${session.user.picture})`,
                      }}
                    ></div>
                    <p className="text-blue-500 font-semibold text-xs md:text-sm xl:text-base">
                      {session?.user?.name ?? "Khách"}
                    </p>
                  </div>
                  <textarea
                    className="border focus:outline-blue-200 p-2 rounded w-full"
                    placeholder="Trả lời bình luận này..."
                    value={writeAnswerComment.content}
                    onChange={(e) =>
                      setWriteAnswerComment((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                  ></textarea>

                  <div>
                    <button
                      className="px-4 py-1.5 bg-blue-500 text-white rounded font-light hover:bg-blue-700"
                      onClick={() =>
                        handleWriteComment({
                          content: writeAnswerComment.content,
                        })
                      }
                    >
                      Gửi
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comment;
