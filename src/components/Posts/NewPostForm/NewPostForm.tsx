import { firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import { IPost } from "@/types/types";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { Timestamp, addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import ImageUpload from "./ImageUpload";
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

type NewPostFormProps = {
  user: User;
  communityId: string;
  communityImageURL?: string;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ user, communityId, communityImageURL }) => {
  const router = useRouter();
  const [selectedTabIndex, setSelectedTabindex] = useState(0);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const {
    selectedFileData: selectedImageFileData,
    setSelectedFileData: setSelectedImageFileData,
    onSelectFile: onSelectImage,
  } = useSelectFile();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const selectFileRef = useRef<HTMLInputElement>(null);

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  /**
   * Actually creates new post in the Firestore database.
   */
  const handleCreatePost = async () => {
    const newPost: IPost = {
      communityId,
      communityImageURL: communityImageURL || "",
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };

    // Save new post to the database
    setIsLoading(true);
    setError("");

    try {
      // Create the document with new post text
      const postDocumentRef = await addDoc(collection(firestore, "posts"), newPost);
      // Upload the image file
      if (selectedImageFileData) {
        const imageRef = ref(storage, `posts/${postDocumentRef.id}/image`);
        await uploadString(imageRef, selectedImageFileData, "data_url");
        const imageDownloadURL = await getDownloadURL(imageRef);

        // Update post document with `imageDownloadURL`
        await updateDoc(postDocumentRef, {
          imageURL: imageDownloadURL,
        });
      }

      // Clear all inputs and selected image
      setTextInputs({
        title: "",
        body: "",
      });
      setSelectedImageFileData("");

      // Navigate to the community page
      router.push(`/b/${communityId}`);
    } catch (error: any) {
      console.log("handleCreatePost error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item, index) => (
          <TabItem
            item={item}
            key={`tab-key-${index}`}
            isSelected={index === selectedTabIndex}
            isDisabled={isLoading}
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
            selectedFile={selectedImageFileData}
            setSelectedFile={setSelectedImageFileData}
            selectPostTab={() => setSelectedTabindex(0)}
            selectFileRef={selectFileRef}
            onSelectImage={onSelectImage}
          />
        )}

        {selectedTabIndex === 2 && <Text>Links are not yet implemented!</Text>}
        {selectedTabIndex === 3 && <Text>Polls are not yet implemented!</Text>}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </Flex>
  );
};

export default NewPostForm;
