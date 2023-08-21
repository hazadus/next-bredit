import { communityState } from "@/atoms/communitiesAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import { ICommunity } from "@/types/types";
import { Box, Button, Divider, Flex, Icon, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import moment from "moment";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import { useSetRecoilState } from "recoil";

type AboutCommunityProps = {
  community: ICommunity;
};

const AboutCommunity: React.FC<AboutCommunityProps> = ({ community }) => {
  const [user] = useAuthState(auth);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { selectedFileData, setSelectedFileData, onSelectFile } = useSelectFile();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const setCommunityStateValue = useSetRecoilState(communityState);

  /**
   * Upload image to the Firestore and update community document with new URL.
   */
  const onUpdateImage = async () => {
    if (!selectedFileData) return;

    setIsUploadingImage(true);

    try {
      const imageRef = ref(storage, `communities/${community.id}/image`);
      await uploadString(imageRef, selectedFileData, "data_url");
      const imageDownloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", community.id), { imageURL: imageDownloadURL });
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: imageDownloadURL,
        } as ICommunity,
      }));
    } catch (error: any) {
      console.log("onUpdateImage error:", error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <Box position="sticky" top="14px" width="100%">
      <Flex
        justify="space-between"
        align="center"
        bg="blue.400"
        color="white"
        p={3}
        borderRadius="4px 4px 0 0"
      >
        <Text fontSize="10pt" fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0 0 4px 4px">
        <Stack>
          <Flex width="100%" p={2} fontSize="10pt" fontWeight={700}>
            <Flex direction="column" flexGrow={1}>
              <Text>{community.numberOfMembers}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex align="center" width="100%" p={1} fontSize="10pt" fontWeight={500}>
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            {community.createdAt && (
              <Text>
                Created {moment(new Date(community.createdAt.seconds * 1000)).format("MMM DD, YYYY")}
              </Text>
            )}
          </Flex>
          <Link href={`/b/${community.id}/submit`}>
            <Button mt={3} height="30px" width="100%">
              Create Post
            </Button>
          </Link>

          {user?.uid === community.creatorId && (
            <>
              <Divider />
              <Stack spacing={1} fontSize="10pt">
                <Text fontWeight={600}>Admin</Text>
                <Flex align="center" justify="space-between">
                  <Text
                    color="blue.500"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                  >
                    Change Image
                  </Text>
                  {community.imageURL || selectedFileData ? (
                    <Image
                      src={selectedFileData || community.imageURL}
                      borderRadius="full"
                      boxSize="40px"
                      alt="Community Image"
                    />
                  ) : (
                    <Icon as={FaReddit} fontSize={40} color="brand.100" mr={2} />
                  )}
                </Flex>

                {selectedFileData &&
                  (isUploadingImage ? (
                    <Spinner />
                  ) : (
                    <Text
                      color="blue.500"
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                      onClick={onUpdateImage}
                    >
                      Save Changes
                    </Text>
                  ))}
                <input
                  hidden
                  id="file-upload"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg,image/png"
                  ref={fileInputRef}
                  onChange={onSelectFile}
                />
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default AboutCommunity;
