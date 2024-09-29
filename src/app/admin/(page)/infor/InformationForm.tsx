"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { sendRequest } from "@/http/http";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import PreviewImage from "@/components/preview-image";

const InformationAdd = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const fetchUserById = async () => {
    const result = await sendRequest<TResponse<TUser>>({
      url: `/blog-api/users/${session?.user.id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      typeComponent: "CSR",
    });
    if (result.statusCode <= 299 && result.data) {
      form.setValue("id", result.data.id);
      form.setValue("name", result.data.name);
      form.setValue("image", result.data.image ?? "");
    }
    setLoading(false);
  };
  useEffect(() => {
    if (session?.user.id) {
      fetchUserById();
    }
  }, [session]);

  const formSchema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: "This field is required" }),
    file: z.any().optional(),
    image: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      image: "",
      file: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("id", values.id);
    formData.append("name", values.name);
    formData.append("image", values.image);
    formData.append("file", values?.file?.[0] ?? null);

    const response = await axios({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_ENDPOINT_CSR_COMPONENT}/blog-api/users`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${(session as Session).accessToken}`,
      },
    });

    if (response.data.statusCode === 200) {
      toast.success(`Updated successful`);
    } else {
      toast.error(`Server Error...`);
    }
  };

  return (
    <>
      {loading ? (
        <div className="h-full flex justify-center items-center">
          <div
            className="w-12 h-12 rounded-full animate-spin
                        border-4 border-solid border-blue-500 border-t-transparent"
          ></div>
        </div>
      ) : (
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (error) =>
              console.log(error)
            )}
            action=""
            className="flex flex-col gap-y-6 pe-1"
          >
            <div className="flex flex-col gap-y-4">
              <div>
                <label htmlFor="name" className="font-bold">
                  Name <span className="text-red-500">*</span>
                </label>

                <Controller
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full rounded-lg px-3 py-2 border-2 border-gray-300 hover:border-gray-400 outline-1 outline-gray-400 transition-all duration-200 ease-in-out"
                      autoFocus
                    />
                  )}
                  name="name"
                  control={form.control}
                />
                <ErrorMessage
                  errors={form.formState.errors}
                  name="name"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm">{message}</p>
                  )}
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label htmlFor="file" className="font-bold">
                  Avatar
                </label>
                <input
                  id="file"
                  type="file"
                  className="w-full rounded-lg px-3 py-2 border-2 border-gray-300 hover:border-gray-400 outline-1 outline-gray-400 transition-all duration-200 ease-in-out"
                  {...form.register("file")}
                />

                <>
                  <PreviewImage />
                </>
              </div>

              <div>
                <button
                  type="submit"
                  className=" bg-blue-500 py-2 px-4 rounded-md text-white font-bold hover:bg-blue-500/80"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      )}
    </>
  );
};

export default InformationAdd;
