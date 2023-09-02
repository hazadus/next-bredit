import AuthButtons from "@/components/Navbar/RightContent/AuthButtons";
import { Button, Divider, Flex, Icon, Text, Textarea } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import { BsMarkdown } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    <>
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
              align="center"
              justify="space-between"
              bg="gray.100"
              p="6px 8px"
              borderRadius="0px 0px 4px 4px"
              zIndex={100}
            >
              <Flex align="center">
                <Icon as={BsMarkdown} ml={2} mr={2} />
                <Text fontSize="10pt" color="gray.500">
                  You can use Markdown to format your post.
                </Text>
              </Flex>
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

      {/* Comment body rendered preview */}
      {commentBody.trim().length > 0 && (
        <Flex
          direction="column"
          bg="white"
          mt={2}
          p={4}
          className="markdown-content"
          border="1px solid"
          borderRadius="4px"
          borderColor="gray.100"
        >
          <Text fontWeight={700}>Comment content preview</Text>

          <Divider mt={1} mb={3} />

          <Flex direction="column" fontSize={{ base: "11px", md: "12px" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{commentBody}</ReactMarkdown>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default CommentInput;
