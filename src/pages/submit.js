import { useRouter } from "next/dist/client/router";
import React from "react";
import { useForm } from "react-hook-form";
import App from "../components/app";
import { useHttpClient } from "../utils/useHttpClient";

function submit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [, submitPost] = useHttpClient(
    { url: "/post/create" },
    { manual: true }
  );
  const router = useRouter();
  const onSubmit = (value) =>
    submitPost({ data: value })
      .then(() => router.push("/"))
      .catch((err) => {
        alert(err.response?.data.msg);
      });
  return (
    <App>
      <div className="flex flex-row my-20 mx-auto max-w-5xl space-x-6">
        <div className="flex w-1/3">
          <img src="/login.svg" />
        </div>
        <div className="py-12 px-12 space-y-10 w-2/3">
          <div>
            <h1 className="text-3xl font-bold text-gray-700 mb-4 cursor-pointer">
              Create a new post
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Title"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-sm text-red-500">Title is required</span>
              )}
              <textarea
                className="w-full h-48 px-3 text-sm text-gray-700 border rounded-lg"
                placeholder="Content"
                {...register("text", { required: true })}
              />
              {errors.text && (
                <span className="text-sm text-red-500">
                  Content is required
                </span>
              )}
            </div>
            <div className="mt-6 text-right">
              <button
                type="submit"
                className="py-3 w-64 text-xl text-white font-semibold bg-green-400 rounded-2xl"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </App>
  );
}

export default submit;
