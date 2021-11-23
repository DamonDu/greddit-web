import { useRouter } from "next/dist/client/router";
import React from "react";
import { useForm } from "react-hook-form";
import App from "../components/app";
import { useHttpClient } from "../utils/useHttpClient";

function login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [, login] = useHttpClient({ url: "/user/login" }, { manual: true });
  const onSubmit = (value) =>
    login({ data: value })
      .then((res) => {
        localStorage.setItem("token", res?.data.token);
        router.push("/");
      })
      .catch((err) => {
        alert(err.response?.data.msg);
      });
  return (
    <App>
      <div className="flex flex-row my-20 mx-auto max-w-5xl space-x-6">
        <div className="flex w-1/2">
          <img src="/login.svg" />
        </div>
        <div className="w-1/2 py-12 px-12 space-y-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-700 text-center mb-4 cursor-pointer">
              Login Now
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <input
                type="email"
                placeholder="Email Addres"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  Email Addres is required
                </span>
              )}
              <input
                type="password"
                placeholder="Password"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  Password is required
                </span>
              )}
            </div>
            <div className="text-center mt-6">
              <button
                type="submit"
                className="py-3 w-64 text-xl text-white font-semibold bg-green-400 rounded-2xl"
              >
                Login
              </button>
              <p className="mt-4 text-sm">
                Don&apos;t Have An Account?{" "}
                <span className="underline cursor-pointer">
                  <a href="/register">Register Now</a>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </App>
  );
}

export default login;
