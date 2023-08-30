import AuthButtons from "@/components/Navbar/RightContent/AuthButtons";
import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";

type CommentInputProps = {
  commentBody: string;
  setCommentBody: (value: string) => void;
  user?: User;
  isLoading: boolean;
  onCreateComment: (commentBody: string) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({
  commentBody,
  setCommentBody,
  user,
  isLoading,
  onCreateComment,
}) => {
  return (
    <Flex direction="column" position="relative">
      {user ? (
        <>
          <Text mb={1}>
            Comment as <span style={{ color: "#3182CE" }}>{user?.email?.split("@")[0]}</span>
          </Text>
          <Textarea
            value={commentBody}
            onChange={(event) => setCommentBody(event.target.value)}
            placeholder="What are your thoughts?"
            fontSize="10pt"
            borderRadius={4}
            minHeight="160px"
            pb={10}
            isDisabled={isLoading}
            _placeholder={{ color: "gray.500" }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid black",
            }}
          />
          <Flex
            position="absolute"
            left="1px"
            right={0.1}
            bottom="1px"
            justify="flex-end"
            bg="gray.100"
            p="6px 8px"
            borderRadius="0px 0px 4px 4px"
            zIndex={100}
          >
            <Button
              height="26px"
              isDisabled={!commentBody.trim().length}
              isLoading={isLoading}
              onClick={() => onCreateComment(commentBody)}
            >
              Comment
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          align="center"
          justify="space-between"
          borderRadius={2}
          border="1px solid"
          borderColor="gray.100"
          p={4}
        >
          <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
          <AuthButtons />
        </Flex>
      )}
    </Flex>
  );
};

export default CommentInput;