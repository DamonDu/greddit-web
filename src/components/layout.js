import React from "react";
import Navbar from "./navbar";

function Layout(props) {
  return (
    <div className="flex flex-col min-h-screen font-roboto">
      <Navbar />
      <main className="flex-1 my-24">
        <div className="bg-white">
          <div className="container px-4 mx-auto lg:w-full">
            {props.children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
