import { Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import TextInputs from "./TextInputs";

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
];

type Props = {};

const NewPostForm: React.FC<Props> = () => {
  const [selectedTabIndex, setSelectedTabindex] = useState(0);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedImageFile, setSelectedImageFile] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSelectImage = () => {};

  const handleCreatePost = async () => {};

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item, index) => (
          <TabItem
            item={item}
            isSelected={index === selectedTabIndex}
            setSelectedTab={() => setSelectedTabindex(index)}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTabIndex === 0 && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            isLoading={isLoading}
          />
        )}

        {selectedTabIndex === 2 && <Text>Links are not yet implemented!</Text>}
        {selectedTabIndex === 3 && <Text>Polls are not yet implemented!</Text>}
      </Flex>
    </Flex>
  );
};

export default NewPostForm;
