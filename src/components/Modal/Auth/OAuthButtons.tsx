import { auth, firestore } from "@/firebase/clientApp";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const OAuthButtons: React.FC = () => {
  const [signinWithGoogle, newUserCredentials, loadingGoogle, googleSignInError] = useSignInWithGoogle(auth);

  /**
   * Add or update user document in `users` collection in the Firestore database.
   * With OAuth, we don't know exactly, if user logs in for the first time or not,
   * so we update the document if it exists.
   * @param user Firebase User instance
   */
  const createUserDocument = async (user: User) => {
    const userDocumentRef = doc(firestore, "users", user.uid);
    await setDoc(userDocumentRef, JSON.parse(JSON.stringify(user)));
  };

  // Triggers each time `newUserCredentials` has changed
  useEffect(() => {
    if (newUserCredentials) {
      createUserDocument(newUserCredentials.user);
    }
  }, [newUserCredentials]);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button variant="oauth" mb={2} onClick={() => signinWithGoogle()} isLoading={loadingGoogle}>
        <Image src="/images/googleLogo.png" height="20px" mr={2} />
        Continue with Google
      </Button>
      <Button variant="oauth">
        <Image src="/images/githubLogo.png" height="20px" mr={2} />
        Continue with GitHub
      </Button>
      {googleSignInError && (
        <Text fontSize="10pt" color="red" align="center" mb={2}>
          {googleSignInError.message}
        </Text>
      )}
    </Flex>
  );
};

export default OAuthButtons;
