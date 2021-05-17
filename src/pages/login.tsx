import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { AxiosError } from "axios";
import { useHttpClient } from "../utils/useHttpClient";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const toast = useToast();
  const router = useRouter();
  const [_, login] = useHttpClient({ url: "/user/login" }, { manual: true });
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values) => {
          await login({ data: values })
            .then(function () {
              router.push("/");
            })
            .catch(function (err: AxiosError) {
              toast({
                title: "Login Failed",
                description: err.response?.data.msg,
                isClosable: true,
              });
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex direction="column">
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
              ></InputField>
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                ></InputField>
              </Box>
              <Button
                type="submit"
                isLoading={isSubmitting}
                mt={8}
                colorScheme="twitter"
                mx="center"
              >
                Login
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
