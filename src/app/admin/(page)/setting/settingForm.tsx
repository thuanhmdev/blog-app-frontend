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
import Loading from "@/components/loading";

const SettingForm = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const fetchSettingData = async () => {
    const result = await sendRequest<TResponse<TSetting>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/settings`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (result.statusCode === 200) {
      form.setValue("title", result.data.title);
      form.setValue("logo", result.data.logo ?? "");
      form.setValue("siteName", result.data.siteName ?? "");
      form.setValue("email", result.data.email ?? "");
      form.setValue("description", result.data?.description ?? "");
      form.setValue("facebookLink", result.data?.facebookLink ?? "");
      form.setValue("messengerLink", result.data?.messengerLink ?? "");
      form.setValue("xLink", result.data?.xLink ?? "");
      form.setValue("instagramLink", result.data?.instagramLink ?? "");
      form.setValue("zaloLink", result.data?.zaloLink ?? "");
    }
    setLoading(false);
  };
  useEffect(() => {
    if (session?.user.id) {
      fetchSettingData();
    }
  }, [session]);

  const formSchema = z.object({
    title: z.string().min(1, { message: "This field is required" }),
    description: z.string(),
    email: z.string().email().min(1, { message: "This field is required" }),
    logo: z.string(),
    siteName: z.string(),
    facebookLink: z.string(),
    messengerLink: z.string(),
    xLink: z.string(),
    instagramLink: z.string(),
    zaloLink: z.string(),
    file: z.any().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      email: "",
      siteName: "",
      logo: "",
      facebookLink: "",
      messengerLink: "",
      xLink: "",
      instagramLink: "",
      zaloLink: "",
      file: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description ?? "");
    formData.append("email", values.email ?? "");
    formData.append("siteName", values.description ?? "");
    formData.append("logo", values.logo);
    formData.append("facebookLink", values.facebookLink);
    formData.append("messengerLink", values.messengerLink);
    formData.append("xLink", values.xLink);
    formData.append("instagramLink", values.instagramLink);
    formData.append("zaloLink", values.zaloLink);
    formData.append("file", values?.file?.[0] ?? null);

    const response = await axios({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/settings`,
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
        <Loading />
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
                  Title for Homepage <span className="text-red-500">*</span>
                </label>

                <Controller
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full rounded-lg px-3 py-2 border-2 border-gray-300 hover:border-gray-400 outline-1 outline-gray-400 transition-all duration-200 ease-in-out"
                      autoFocus
                    />
                  )}
                  name="title"
                  control={form.control}
                />
                <ErrorMessage
                  errors={form.formState.errors}
                  name="title"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm">{message}</p>
                  )}
                />
              </div>
              <div>
                <label htmlFor="website_Name" className="font-bold">
                  Website Name
                </label>

                <Controller
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full rounded-lg px-3 py-2 border-2 border-gray-300 hover:border-gray-400 outline-1 outline-gray-400 transition-all duration-200 ease-in-out"
                      autoFocus
                    />
                  )}
                  name="siteName"
                  control={form.control}
                />
                <ErrorMessage
                  errors={form.formState.errors}
                  name="siteName"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm">{message}</p>
                  )}
                />
              </div>

              <div>
                <label htmlFor="description" className="font-bold">
                  Description
                </label>

                <Controller
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows={2}
                      className="w-full rounded-lg px-3 py-2 border-2 border-gray-300 hover:border-gray-400 outline-1 outline-gray-400 transition-all duration-200 ease-in-out"
                      autoFocus
                    />
                  )}
                  name="description"
                  control={form.control}
                />
                <ErrorMessage
                  errors={form.formState.errors}
                  name="description"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm">{message}</p>
                  )}
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label htmlFor="file" className="font-bold">
                  Logo
                </label>
                <input
                  id="file"
                  type="file"
                  className="w-full rounded-lg px-3 py-2 border-2 border-gray-300 hover:border-gray-400 outline-1 outline-gray-400 transition-all duration-200 ease-in-out"
                  {...form.register("file")}
                />

                <>
                  <PreviewImage
                    url={
                      form.getValues("logo")
                        ? `${
                            process.env.NEXT_PUBLIC_BACKEND_STORAGE
                          }/logo/${form.getValues("logo")}`
                        : ""
                    }
                  />
                </>
              </div>

              <div>
                <label htmlFor="name" className="font-bold">
                  Facebook link
                </label>

                <Controller
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full rounded-lg px-3 py-2 border-2 border-gray-300 hover:border-gray-400 outline-1 outline-gray-400 transition-all duration-200 ease-in-out"
                      autoFocus
                    />
                  )}
                  name="facebookLink"
                  control={form.control}
                />
                <ErrorMessage
                  errors={form.formState.errors}
                  name="facebookLink"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm">{message}</p>
                  )}
                />
              </div>
              <div>
                <label htmlFor="name" className="font-bold">
                  Messenger link
                </label>

                <Controller
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full rounded-lg px-3 py-2 border-2 border-gray-300 hover:border-gray-400 outline-1 outline-gray-400 transition-all duration-200 ease-in-out"
                      autoFocus
                    />
                  )}
                  name="messengerLink"
                  control={form.control}
                />
                <ErrorMessage
                  errors={form.formState.errors}
                  name="messengerLink"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm">{message}</p>
                  )}
                />
              </div>

              <div>
                <label htmlFor="name" className="font-bold">
                  X link
                </label>

                <Controller
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full rounded-lg px-3 py-2 border-2 border-gray-300 hover:border-gray-400 outline-1 outline-gray-400 transition-all duration-200 ease-in-out"
                      autoFocus
                    />
                  )}
                  name="xLink"
                  control={form.control}
                />
                <ErrorMessage
                  errors={form.formState.errors}
                  name="xLink"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm">{message}</p>
                  )}
                />
              </div>

              <div>
                <label htmlFor="name" className="font-bold">
                  Instagram Link
                </label>

                <Controller
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full rounded-lg px-3 py-2 border-2 border-gray-300 hover:border-gray-400 outline-1 outline-gray-400 transition-all duration-200 ease-in-out"
                      autoFocus
                    />
                  )}
                  name="instagramLink"
                  control={form.control}
                />
                <ErrorMessage
                  errors={form.formState.errors}
                  name="instagramLink"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm">{message}</p>
                  )}
                />
              </div>
              <div>
                <label htmlFor="name" className="font-bold">
                  Zalo Link
                </label>

                <Controller
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full rounded-lg px-3 py-2 border-2 border-gray-300 hover:border-gray-400 outline-1 outline-gray-400 transition-all duration-200 ease-in-out"
                      autoFocus
                    />
                  )}
                  name="zaloLink"
                  control={form.control}
                />
                <ErrorMessage
                  errors={form.formState.errors}
                  name="zaloLink"
                  render={({ message }) => (
                    <p className="text-red-500 text-sm">{message}</p>
                  )}
                />
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

export default SettingForm;
