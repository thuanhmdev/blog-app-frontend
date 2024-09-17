import { TUser } from "./user";

export {};

declare global {
  type TResponse<T> = {
    message: string | any;
    statusCode: number;
    error: string | null;
    data: T;
  };
  type TPagination<T> = {
    meta: {
      page: number;
      size: number;
      pages: number;
      total: number;
    };
    result: T;
  };
}
