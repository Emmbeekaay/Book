import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  setDoc, doc ,
  getFirestore,
} from "firebase/firestore";

import firebase from "./firebaseConfig";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(null);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async() => {
    setisLoading(true);

    const auth = getAuth(firebase);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        const user = userCredential.user;

          const db = getFirestore(firebase);

          await setDoc(doc(db, "users",user.uid), {
            email: user.email,
            uid: user.uid,
          }).then(() => {
            setisSuccess("success");
            setEmail("");
            setPassword("");
            setisLoading(false);
          });
     
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setisSuccess("error");

        setisLoading(false);
      });
  };

  return (
    <Flex
      bg="lightgrey"
      w="400px"
      flexDir="column"
      m="auto"
      gap="30px"
      boxShadow="xs"
      p="6"
      rounded="md"
      mt="100px"
    >
      <Text fontSize="3xl" align="center" fontWeight="bold">
        SIGN-UP{" "}
      </Text>

      {isSuccess === "error" && (
        <Alert status="error">
          <AlertIcon />
          Email already registerd!
        </Alert>
      )}
      {isSuccess === "success" && (
        <Alert status="success">
          <AlertIcon />
          SignUp successful!
        </Alert>
      )}

      <Box>
        <Text fontSize="xl" mb="10px">
          Email{" "}
        </Text>
        <Input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box>
        <Text fontSize="xl" mb="10px">
          Password{" "}
        </Text>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text mt="5px" color="gray.400">
          password must be 6 character or more!
        </Text>
      </Box>

      <Button
        colorScheme="teal"
        size="md"
        onClick={handleSubmit}
        isLoading={isLoading}
        loadingText="Submitting"
        isDisabled={password.length < 6}
      >
        submit
      </Button>
    </Flex>
  );
};

export default Signup;
