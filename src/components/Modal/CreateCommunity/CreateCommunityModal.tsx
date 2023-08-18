import { auth, firestore } from "@/firebase/clientApp";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<Props> = ({ isOpen, handleClose }) => {
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [validationError, setValidationError] = useState("");
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [firestoreError, setFirestoreError] = useState("");

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;

    setCommunityName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
    setValidationError("");
  };

  const onTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    setValidationError("");
    setFirestoreError("");

    // Validate the community name
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setValidationError(
        "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores.",
      );
      return;
    }

    setIsLoading(true);

    try {
      // Check if community with this name already exists.
      const communityDocRef = doc(firestore, "communities", communityName);
      const communityDoc = await getDoc(communityDocRef);

      if (communityDoc.exists()) {
        setValidationError(`Sorry, b/${communityName} is taken. Try another.`);
        return;
      }

      // Create community document in the Firestore
      await setDoc(communityDocRef, {
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        numberOfMembers: 1,
        privacyType: communityType,
      });
    } catch (error: any) {
      console.log("Error creating community:", error);
      setFirestoreError(error.message);
    } finally {
      setIsLoading(false);
    }

    setCommunityName("");
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent maxW="511px">
          <ModalHeader display="flex" flexDirection="column" fontSize={15} padding={3}>
            Create a community
          </ModalHeader>
          <ModalCloseButton />

          <Box px={3}>
            <Divider />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontSize={15} fontWeight={600}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed.
              </Text>
              <Text position="relative" top="27px" left="10px" width="20px" fontSize={15} color="gray.400">
                b/
              </Text>
              <Input
                value={communityName}
                position="relative"
                size="sm"
                pl="24px"
                mb={2}
                onChange={onNameChange}
              />
              <Text fontSize={11} color={charsRemaining === 0 ? "red" : "gray.500"}>
                {charsRemaining} Characters remaining
              </Text>

              {validationError && (
                <Text fontSize={11} color="red" pt={1}>
                  {validationError}
                </Text>
              )}

              <Box mt={4} mb={4}>
                <Text fontSize={15} fontWeight={600} mb={2}>
                  Community type
                </Text>
                <Stack spacing={2}>
                  <Checkbox name="public" isChecked={communityType === "public"} onChange={onTypeChange}>
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" fontWeight={600} mr={1}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" fontWeight={600} mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view this community, but only approved users can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox name="private" isChecked={communityType === "private"} onChange={onTypeChange}>
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize="10pt" fontWeight={600} mr={1}>
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Only approved users can view and submit to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>

              {firestoreError && (
                <Text fontSize="10pt" color="red" pt={1}>
                  {firestoreError}
                </Text>
              )}
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button variant="outline" height="30px" mr={3} onClick={handleClose} isDisabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleCreateCommunity} height="30px" isLoading={isLoading}>
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
