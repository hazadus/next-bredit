import { communityState } from "@/atoms/communitiesAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import { ICommunity } from "@/types/types";
import { Box, Button, Divider, Flex, Icon, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import { useSetRecoilState } from "recoil";

type AboutCommunityProps = {
  community: ICommunity;
  isCommunityPage: boolean; // Set 'true' if component on community detail page, otherwise 'false'
};

const AboutCommunity: React.FC<AboutCommunityProps> = ({ community, isCommunityPage }) => {
  const [user] = useAuthState(auth);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { selectedFileData, setSelectedFileData, onSelectFile } = useSelectFile();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const setCommunityStateValue = useSetRecoilState(communityState);
  const router = useRouter();

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
    <Box position="sticky" top="58px" width="100%">
      <Flex
        justify="space-between"
        align="center"
        bg="blue.400"
        color="white"
        p={3}
        borderRadius="4px 4px 0 0"
        minHeight="34px"
      >
        {isCommunityPage && (
          <>
            <Text fontSize="10pt" fontWeight={700}>
              About Community
            </Text>
            <Icon as={HiOutlineDotsHorizontal} />
          </>
        )}
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0 0 4px 4px">
        <Stack>
          {(!isCommunityPage || router.asPath.endsWith("submit")) && (
            <Flex align="center">
              <Link href={`/b/${community.id}`}>
                {community.imageURL ? (
                  <Image src={community.imageURL} width="54px" height="54px" borderRadius="full" mr={2} />
                ) : (
                  <Icon
                    as={FaReddit}
                    fontSize={73}
                    color="blue.500"
                    bg="white"
                    border="4px solid white"
                    borderRadius="50px"
                    mr={2}
                  />
                )}
              </Link>
              <Link href={`/b/${community.id}`}>
                <Text fontWeight={600}>b/{community.id}</Text>
              </Link>
            </Flex>
          )}

          <Flex align="center" width="100%" p={1} fontSize="10pt" fontWeight={500} mb={1}>
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            {community.createdAt && (
              <Text color="gray.500">
                Created {moment(new Date(community.createdAt.seconds * 1000)).format("MMM DD, YYYY")}
              </Text>
            )}
          </Flex>

          <Divider />

          <Flex width="100%" p={2} fontSize="10pt" fontWeight={700}>
            <Flex direction="column" flexGrow={1}>
              <Text fontSize={16}>{community.numberOfMembers}</Text>
              <Text fontSize={12} color="gray.500">
                Members
              </Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text fontSize={16}>1</Text>
              <Text fontSize={12} color="gray.500">
                Online
              </Text>
            </Flex>
          </Flex>

          {/* Hide "Create post" button on submit page */}
          {!router.asPath.endsWith("submit") && (
            <>
              <Divider />

              <Link href={`/b/${community.id}/submit`}>
                <Button mt={1} height="30px" width="100%">
                  Create Post
                </Button>
              </Link>
            </>
          )}

          {/* Admin block */}
          {user?.uid === community.creatorId && (
            <>
              <Divider mt={1} />

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
