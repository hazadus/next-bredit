import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");

  const [createUserWithEmailAndPassword, user, loading, signupError] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (signupForm.password !== signupForm.confirmPassword) {
      setFormError("Entered passwords do not match.");
      return;
    }

    createUserWithEmailAndPassword(signupForm.email, signupForm.password);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSignupForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          required
          name="email"
          placeholder="email"
          type="email"
          mb={2}
          onChange={onChange}
          isDisabled={loading}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.50"
        />
        <Input
          required
          name="password"
          placeholder="password"
          type="password"
          mb={2}
          onChange={onChange}
          isDisabled={loading}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.50"
        />
        <Input
          required
          name="confirmPassword"
          placeholder="confirm password"
          type="password"
          mb={2}
          onChange={onChange}
          isDisabled={loading}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.50"
        />
        {formError ||
          (signupError && (
            <Text fontSize="10pt" color="red" align="center" mb={2}>
              {formError}
              {signupError.message}
            </Text>
          ))}
        <Button type="submit" width="100%" height="36px" mt={2} mb={2} isLoading={loading}>
          Sign Up
        </Button>
        <Flex fontSize="9pt" justifyContent="center">
          <Text mr={1}>Already a breditor?</Text>
          <Text
            color="blue.500"
            fontWeight={700}
            cursor="pointer"
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                view: "login",
              }))
            }
          >
            LOG IN
          </Text>
        </Flex>
      </form>
    </>
  );
};

export default SignUp;
