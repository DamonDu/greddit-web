import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useHttpClient } from "../utils/useHttpClient";
import { AxiosError } from "axios";
import { useRouter } from "next/dist/client/router";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const toast = useToast();
  const router = useRouter();
  const [{ data, loading }] = useHttpClient(
    { url: "/user/me" },
    { useCache: false }
  );
  const [, logout] = useHttpClient({ url: "/user/logout" }, { manual: true });

  let doLogout = async () => {
    await logout()
      .then(function () {
        router.reload();
      })
      .catch(function (err: AxiosError) {
        toast({
          title: "Logout filed",
          description: err.response?.data.errorMsg,
          isClosable: true,
        });
      });
  };

  let body = null;
  if (!loading) {
    if (data) {
      body = (
        <>
          <Flex>
            <Menu isLazy size="xs">
              <MenuButton mr={2} as={Button} rightIcon={<ChevronDownIcon />}>
                <Flex>
                  <Avatar
                    mr={3}
                    size="xs"
                    name={data.username}
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                  <Text my="auto">{data.username}</Text>
                </Flex>
              </MenuButton>
              <MenuList>
                <NextLink href="/submit">
                  <MenuItem>Post</MenuItem>
                </NextLink>
                <MenuItem onClick={doLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </>
      );
    } else {
      body = (
        <>
          <NextLink href="/login">
            <Button mr={2}> Login </Button>
          </NextLink>
          <NextLink href="/register">
            <Button> Register </Button>
          </NextLink>
        </>
      );
    }
  }
  return (
    <Flex shadow="md" p={4}>
      <NextLink href="/">
        <Heading as="h2" size="lg" my="auto" ml={2}>
          Greddit
        </Heading>
      </NextLink>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default NavBar;
