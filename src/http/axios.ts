import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENPOINT,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiCreateDataWithFile = async <T>(
  url: string,

  data: FormData,
  accessToken: string
): Promise<T> => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  if (accessToken) {
    Object.assign(headers, { Authorization: `Bearer ${accessToken}` });
  }

  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`,
      data,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiCreateUpdateDataWithFile = async <T>(
  url: string,
  method: "POST" | "PUT",
  data: FormData,
  accessToken: string
): Promise<T> => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  if (accessToken) {
    Object.assign(headers, { Authorization: `Bearer ${accessToken}` });
  }

  try {
    const response = await axiosInstance({
      method: method,
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`,
      data: data,
      headers: headers,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
