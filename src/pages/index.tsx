import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
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
      pageSize: 10,
    },
  });

  useEffect(() => {
    setDataPerPage((d) => d.concat(data?.list));
  }, [data]);

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
      {data && data.hasMore ? (
        <Flex>
          <Button
            colorScheme="teal"
            size="md"
            m="auto"
            my={8}
            onClick={() => setPage((p) => p + 1)}
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default Index;
