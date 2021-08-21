import React from "react";
import App from "../components/app";
import { useHttpClient } from "../utils/useHttpClient";
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";

register.propTypes = {};

function register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [, userRegister] = useHttpClient(
    { url: "/user/register" },
    { manual: true }
  );
  const router = useRouter();
  const onSubmit = (value) =>
    userRegister({ data: value })
      .then(() => router.push("/"))
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
              Create An Account
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Username"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="text-sm text-red-500">
                  Username is required
                </span>
              )}
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
                Create Account
              </button>
              <p className="mt-4 text-sm">
                Already Have An Account?{" "}
                <span className="underline cursor-pointer">
                  <a href="/login"> Sign In</a>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </App>
  );
}

export default register;
