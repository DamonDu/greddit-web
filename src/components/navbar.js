import { useRouter } from "next/dist/client/router";
import React from "react";
import { useHttpClient } from "../utils/useHttpClient";

function Navbar() {
  const [{ data, loading }] = useHttpClient(
    { url: "/user/me" },
    { useCache: false }
  );
  const router = useRouter();
  const [, logout] = useHttpClient({ url: "/user/logout" }, { manual: true });
  const logoutOnSubmit = () =>
    logout().then(() => {
      localStorage.removeItem("token");
      router.reload();
    });
  return (
    <header className="bg-white border-b lg:fixed lg:w-full lg:top-0 lg:left-0 lg:z-40">
      <div className="container px-4 py-5 mx-auto space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:space-x-10">
        <div className="container space-x-1 flex flex-row items-center">
          {/* logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <div className="container text-2xl">
            <p className="text-green-400 inline-block">G</p>
            <a href="/" className="no-underline text-gray-800 font-semibold">
              reddit
            </a>
          </div>
          <div className="container flex flex-row items-center justify-end space-x-3">
            <a
              href="/submit"
              className="px-4 py-2 rounded-lg bg-green-400 text-white text-sm font-semibold"
            >
              Submit new post
            </a>
            {/* login or logout button */}
            {!loading && data === null ? (
              <a
                href="/login"
                className="border px-4 py-2 rounded-lg text-gray-600 text-sm"
              >
                Login
              </a>
            ) : (
              <a
                href="#"
                onClick={logoutOnSubmit}
                className="border px-4 py-2 rounded-lg text-gray-600 text-sm"
              >
                Log out
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
