import { Flex, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import TextInputs from "./TextInputs";
import ImageUpload from "./ImageUpload";

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
  const selectFileRef = useRef<HTMLInputElement>(null);

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  /**
   * Stores selected file in `selectedImageFile` as string.
   * @param event Event emitted by file input on change (when file is selected)
   */
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedImageFile(readerEvent.target?.result as string);
      }
    };
  };

  const handleCreatePost = async () => {};

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item, index) => (
          <TabItem
            item={item}
            key={`tab-key-${index}`}
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

        {selectedTabIndex === 1 && (
          <ImageUpload
            selectedFile={selectedImageFile}
            setSelectedFile={setSelectedImageFile}
            selectPostTab={() => setSelectedTabindex(0)}
            selectFileRef={selectFileRef}
            onSelectImage={onSelectImage}
          />
        )}

        {selectedTabIndex === 2 && <Text>Links are not yet implemented!</Text>}
        {selectedTabIndex === 3 && <Text>Polls are not yet implemented!</Text>}
      </Flex>
    </Flex>
  );
};

export default NewPostForm;
