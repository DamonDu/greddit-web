import { Box, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useHttpClient } from "../utils/useHttpClient";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, loading }] = useHttpClient({ url: "/user/me" });
  let body = null;
  if (!loading) {
    if (data) {
      body = (
        <>
          <Flex>
            <Box mr={2}>{data.username}</Box>
            <Link> Logout </Link>
          </Flex>
        </>
      );
    } else {
      body = (
        <>
          <NextLink href="/login">
            <Link mr={2}> Login </Link>
          </NextLink>
          <NextLink href="/register">
            <Link> Register </Link>
          </NextLink>
        </>
      );
    }
  }
  return (
    <Flex shadow="md" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default NavBar;
