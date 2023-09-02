import { Button, Flex, Input, Stack, Textarea, Text, Icon } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsMarkdown } from "react-icons/bs";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCreatePost: () => void;
  isLoading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({ textInputs, onChange, handleCreatePost, isLoading }) => {
  let titleInput: HTMLInputElement | null = null;

  useEffect(() => {
    if (titleInput) titleInput.focus();
  }, [titleInput]);

  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        value={textInputs.title}
        ref={(input) => (titleInput = input)}
        onChange={onChange}
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Title"
        isDisabled={isLoading}
      />
      <Textarea
        name="body"
        value={textInputs.body}
        fontSize="10pt"
        placeholder="Text (optional)"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
        height="100px"
        isDisabled={isLoading}
        onChange={onChange}
      />
      <Flex align="center">
        <Icon as={BsMarkdown} ml={2} mr={2} />
        <Text fontSize="10pt" color="gray.500">
          You can use Markdown to format your post.
        </Text>
      </Flex>
      <Flex justify="flex-end">
        <Button
          height="34px"
          padding="0px 30px"
          isDisabled={!textInputs.title}
          isLoading={isLoading}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};

export default TextInputs;
