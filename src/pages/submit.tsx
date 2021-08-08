import React from "react";
import Layout from "../components/Layout";
import { Box, Button, Flex, Heading, useToast } from "@chakra-ui/react";
import "draft-js/dist/Draft.css";
import { Form, Formik, FormikValues } from "formik";
import { InputField } from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useHttpClient } from "../utils/useHttpClient";
import { useRouter } from "next/dist/client/router";
import { AxiosError } from "axios";

interface SubmitProps {}

export const Submit: React.FC<SubmitProps> = ({}) => {
  const router = useRouter();
  const toast = useToast();
  const [, postCreate] = useHttpClient(
    { url: "/post/create" },
    { manual: true }
  );
  let registerOnSubmit = async function (values: FormikValues) {
    await postCreate({ data: values })
      .then(function () {
        router.push("/").then(router.reload);
      })
      .catch(function (err: AxiosError) {
        toast({
          title: "Create Post Failed",
          description: err.response?.data.errorMsg,
          isClosable: true,
        });
        router.push("/login");
      });
  };
  return (
    <Layout>
      <Wrapper variant="regular">
        <Heading> Creat a post </Heading>
        <Box mt={8}>
          <Formik
            initialValues={{ title: "", text: "" }}
            onSubmit={registerOnSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Flex direction="column">
                  <InputField
                    name="title"
                    placeholder="title"
                    label="Title"
                    type="text"
                  />
                  <Box mt={4}>
                    <InputField
                      name="text"
                      placeholder="content"
                      label="Content"
                      type="text"
                    />
                  </Box>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    mt={8}
                    colorScheme="twitter"
                    ml="auto"
                  >
                    Submit
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default Submit;
