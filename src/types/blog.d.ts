export {};
declare global {
  type TBlog = {
    id: string;
    title: string;
    content: string;
    image: string;
    description: string;
    keyword: string;
    blogger: TUser;
    createdAt: number;
    updatedAt: number;
  };

  type TComment = {
    id: string;
    user: TUser;
    content: string | null;
    createdAt: number;
    blogId: string;
    rootId: string | null;
    answers: any;
  };
}
