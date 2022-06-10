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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "./firebaseConfig";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(null);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const history = useHistory();
  const handleSubmit = () => {
    setisLoading(true);

    const auth = getAuth(firebase);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential);
        setisSuccess("success");
        setisLoading(false);
        setTimeout(() => {
          history.push("/projects");
        }, 2000);
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
      bg="gray.100"
      w="400px"
      flexDir="column"
      ml="74% "
      gap="30px"
      boxShadow="xl"
      p="6"
      rounded="md"
      mt="100px"
    >
      <Text fontSize="3xl" align="center" fontWeight="bold">
        LOGIN
      </Text>
      {isSuccess === "error" && (
        <Alert status="error">
          <AlertIcon />
          Wrong Username or Password!
        </Alert>
      )}
      {isSuccess === "success" && (
        <Alert status="success">
          <AlertIcon />
          Login successful!
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
      </Box>

      <Button
        colorScheme="teal"
        size="md"
        onClick={handleSubmit}
        isLoading={isLoading}
        loadingText="Submitting"
      >
        submit
      </Button>
    </Flex>
  );
};

export default Login;
