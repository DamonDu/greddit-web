import Post from "../components/post";
import React, { useEffect, useState } from "react";
import App from "../components/app";
import { useHttpClient } from "../utils/useHttpClient";
import useEventListener from "@use-it/event-listener";

export default function index() {
  const [pageNum, setPageNum] = useState(1);
  const [{ data, loading }] = useHttpClient({
    method: "POST",
    url: "/post/pageQuery",
    data: {
      page: pageNum,
      pageSize: 27,
    },
  });
  const [pageData, setPageData] = useState([]);
  useEffect(() => {
    setPageData((d) => d.concat(data?.list));
  }, [data]);

  // scroll to load more
  useEventListener("scroll", () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 5 >=
      document.scrollingElement.scrollHeight
    ) {
      setPageNum((p) => p + 1);
    }
  });

  return (
    <div>
      <App>
        {!data && loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {pageData.map((e) =>
              !e ? null : (
                <Post
                  key={e.postId}
                  title={stringSnippets(e.title, 40)}
                  desc={e.text}
                  username={e.username}
                />
              )
            )}
          </div>
        )}
      </App>
    </div>
  );
}

function stringSnippets(sourceString, length) {
  return sourceString.length <= length
    ? sourceString
    : sourceString.substring(0, length) + "...";
}
