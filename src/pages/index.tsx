import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useEventListener,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useHttpClient } from "../utils/useHttpClient";

function Feature({ title, desc, username, ...rest }: any) {
  return (
    <Box flex={1} p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text as="i">posted by {username}</Text>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
}

const Index = () => {
  const [_page, setPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState([]);
  const [{ data, loading }] = useHttpClient({
    url: "/post/pageQuery",
    data: {
      page: _page,
      pageSize: 20,
    },
  });

  useEffect(() => {
    setDataPerPage((d) => d.concat(data?.list));
  }, [data]);

  let loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 5 >=
      document.scrollingElement!.scrollHeight
    ) {
      setPage((p) => p + 1);
    }
  };

  useEventListener("scroll", loadMore);

  return (
    <Layout>
      {!data && loading ? (
        <Text>Loading...</Text>
      ) : (
        <Stack spacing={8}>
          {dataPerPage.map((post: any) =>
            !post ? null : (
              <Feature
                key={post.postId}
                title={post.title}
                desc={post.text}
                username={post.username}
              />
            )
          )}
        </Stack>
      )}
      {data && data.hasMore ? null : (
        <Flex>
          <Text fontSize="lg" m="auto" my={8}>
            No More
          </Text>
        </Flex>
      )}
    </Layout>
  );
};

export default Index;
