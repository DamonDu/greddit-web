import React from "react";
import { string } from "prop-types";

Post.propTypes = {
  title: string,
  desc: string,
  username: string,
};

function Post(props) {
  return (
    <div className="bg-white overflow-hidden hover:bg-green-100 border border-gray-200 p-5 shadow rounded-lg z">
      <div className="text-justify text-sm">
        <h2 className="font-semibold text-lg text-gray-900 mb-2 md:text-xl truncate">
          {props.title}
        </h2>
        <p className="text-gray-500 leading-tight">{props.desc}</p>
      </div>
      <div className="text-right mt-2">
        <p className="text-green-400 font-semibold text-sm">
          Post by {props.username}
        </p>
      </div>
    </div>
  );
}

export default Post;
