import { aboutAppModalState } from "@/atoms/aboutAppModalAtom";
import {
  Divider,
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";

const AboutAppModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(aboutAppModalState);

  const handleClose = () => {
    setModalState((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  return (
    <Modal isOpen={modalState.isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>About Bredit</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={2}>
          <Flex direction="column" align="center" justify="center" width="90%" mb={3}>
            <Image src="/images/breditFace-w.png" width="150px" mb={5} />
            <Text>Bredit is a simple version of original Reddit app.</Text>
            <Text fontWeight={600} mb={3}>
              {`🚧`}Not all features are implemented! 🏗️
            </Text>

            <Divider mb={3} />

            <Flex direction="column" mb={3}>
              <Text fontSize={14}>
                Building this project was possible thanks to Shadee Merhi{"'"}s{" "}
                <Link
                  href="https://www.youtube.com/watch?v=zhx9FUSuAsM&list=PLu3PzwcGv6t7Xygj1GLM5DMKihUG2a92Y&pp=iAQB"
                  color="blue.500"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  target="blank"
                >
                  amazing video course
                </Link>
                . He{"'"}s truly a great teacher, and you should definitelly subscribe to{" "}
                <Link
                  href="https://www.youtube.com/@shadmerhi/featured"
                  color="blue.500"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  target="blank"
                >
                  his channel
                </Link>{" "}
                on YouTube if you{"'"}re interested in web development! Thanks, Shadee!
              </Text>
            </Flex>

            <Divider mb={3} />

            <Text>
              Built by{" "}
              <Link
                href="https://hazadus.ru"
                color="blue.500"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                target="blank"
              >
                Hazadus
              </Link>
            </Text>
            <Link
              href="https://github.com/hazadus/next-bredit"
              color="blue.500"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              target="blank"
            >
              Source code
            </Link>
            <Link
              href="/b/bredit"
              color="blue.500"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              target="blank"
            >
              Discuss Bredit on Bredit 😀
            </Link>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AboutAppModal;
