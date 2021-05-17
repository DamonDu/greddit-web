import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { Formik, Form } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useHttpClient } from "../utils/useHttpClient";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const toast = useToast();
  const [_, register] = useHttpClient(
    { url: "/user/register" },
    { manual: true }
  );
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values) => {
          await register({ data: values })
            .then(function () {
              router.push("/");
            })
            .catch(function (err: AxiosError) {
              toast({
                title: "Register Failed",
                description: err.response?.data,
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
                  name="username"
                  placeholder="username"
                  label="Username"
                ></InputField>
              </Box>
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
                Register
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
