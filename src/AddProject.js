import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import firebase from "./firebaseConfig";
import {  getFirestore, setDoc, doc } from "firebase/firestore";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [matricNo, setMatricNo] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [YearGradute, setYearGradute] = useState("");
  const [abstract, setAbstract] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(null);

  const handleSubmit = async () => {
    setisLoading(true);
    const db = getFirestore(firebase);
    try {
    
   await setDoc(doc(db, "projects",(matricNo.replace(/\//g, ''))), {
    title:title.toUpperCase(),
    author,
    email,
    matricNo,
    phone,
    address,
    YearGradute,
    abstract,
  }, { merge: true })
    .then(() => {
      setisSuccess("success");
      setisLoading(false);
    })
    
    } catch (error) {
      console.log(error);
      setisSuccess("error");
      setisLoading(false);
    
    }

  };

if(isSuccess){
  setTimeout(()=>{
setisSuccess(null)
  },2000)
}

  return (
    <Flex
      w="400px"
      flexDir="column"
      m="auto"
      gap="30px"
      boxShadow="xs"
      p="6"
      rounded="md"
      marginY="40px"
    >
      <Text fontSize="2xl" align="center">
        Add Project
      </Text>

      {isSuccess === "error" && (
        <Alert status="error">
          <AlertIcon />
          Error adding project!
        </Alert>
      )}
      {isSuccess === "success" && (
        <Alert status="success">
          <AlertIcon />
          Project added successful!
        </Alert>
      )}

      <Box>
        <Text fontSize="xl" mb="10px">
          Name:
        </Text>
        <Input
          type="text"
          placeholder="Full Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </Box>

      <Box>
        <Text fontSize="xl" mb="10px">
          Email Address:
        </Text>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      <Box>
        <Text fontSize="xl" mb="10px">
          Matric Number:
        </Text>
        <Input
          type="text"
          placeholder="Matric_No"
          value={matricNo}
          onChange={(e) => setMatricNo(e.target.value)}
        />
      </Box>

      <Box>
        <Text fontSize="xl" mb="10px">
          phone Number:
        </Text>
        <Input
          type="text"
          placeholder="Phone_No"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Box>

      <Box>
        <Text fontSize="xl" mb="10px">
          Address:
        </Text>
        <Input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Box>

      <Box>
        <Text fontSize="xl" mb="10px">
          Session:
        </Text>
        <Select
          placeholder="Select session"
          value={YearGradute}
          onChange={(e) => setYearGradute(e.target.value)}
        >
          <option value="2019/2020">2019/2020</option>
          <option value="2020/2021">2020/2021</option>
          <option value="2021/2022">2021/2022</option>
        </Select>
      </Box>

      <Box>
        <Text fontSize="xl" mb="10px">
          Project Title:
        </Text>
        <Input
          type="text"
          placeholder=" Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Text fontSize="smaller" mt="5px" color="blackAlpha.500">
          TYPE IN UPPERCASE.
        </Text>
      </Box>
      <Box>
        <Text fontSize="xl" mb="10px">
          Project Abstract:
        </Text>
        <Textarea
          type="text"
          placeholder=" Project Abstract"
          size="lg"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
        />
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

export default AddProject;
