"use client";

import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const LoginForm = () => {
  const router = useRouter();
  const formSchema = z.object({
    username: z.string().min(1, { message: "This field is required" }),
    password: z.string().min(1, { message: "This field is required" }),
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
      return;
    }
    router.push("/admin/blog");
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
        action=""
        className="flex flex-col gap-y-6"
      >
        <div>
          <label htmlFor="title" className="font-bold block">
            Username
          </label>

          <Controller
            render={({ field }) => (
              <input
                type="text"
                className="w-full rounded-lg px-3 py-2 border-2 border-gray-300 hover:border-gray-400 outline-1 outline-gray-400 transition-all duration-200 ease-in-out"
                placeholder="Username"
                formNoValidate
                autoFocus
                {...field}
              />
            )}
            name="username"
            control={control}
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => (
              <p className="text-red-500 text-sm">{message}</p>
            )}
          />
        </div>
        <div>
          <label htmlFor="title" className="font-bold block">
            Password
          </label>

          <Controller
            render={({ field }) => (
              <input
                type="password"
                className="w-full rounded-lg px-3 py-2 border-2 border-gray-300 hover:border-gray-400 outline-1 outline-gray-400 transition-all duration-200 ease-in-out"
                placeholder="Password"
                {...field}
              />
            )}
            name="password"
            control={control}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <p className="text-red-500 text-sm">{message}</p>
            )}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 py-2 rounded-full text-white font-bold hover:bg-blue-500/80"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
