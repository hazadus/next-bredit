import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import {
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const [user, loading, userError] = useAuthState(auth);

  // This will be run each time `user` changes
  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  const handleClose = () => {
    setModalState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  return (
    <Modal isOpen={modalState.open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {modalState.view === "login" && "Log In"}
          {modalState.view === "signup" && "Sign Up"}
          {modalState.view === "passwordReset" && "Reset Password"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={2}>
          <Flex direction="column" align="center" justify="center" width="70%">
            <OAuthButtons />
            <Divider orientation="horizontal" />
            <AuthInputs />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
