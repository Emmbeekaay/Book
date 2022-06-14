import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddProject from "./AddProject";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import firebase from "./firebaseConfig";
import BasicTable from "./Table";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";

const db = getFirestore(firebase);

const COLUMNS = [
  {
    Header: "Author",
    accessor: (row) => {
      return (
        <Flex flexDir="column" gap="10px">
          <Box>Name: {row.author}</Box>
          <Box>Matric No: {row.matricNo}</Box>
          <Box>{row.YearGradute}</Box>
          <Box>{row.phone}</Box>
          <Box>{row.email}</Box>
          <Box>{row.address}</Box>
        </Flex>
      );
    },
  },
  {
    Header: "Project Title",
    accessor: "title",
  },

  {
    Header: "Project Abstract",
    accessor: "abstract",
  },
];

const Projects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projects, setProjects] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();

  useEffect(async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
      } else {
        history.push("/");
      }
    });

    const querySnapshot = await getDocs(collection(db, "projects"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setProjects(data);
  }, []);

  useEffect(async () => {
    if (userId) {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setIsAdmin(docSnap.data()?.admin);
      }
    }
  }, [userId]);

  return (
    userId && (
      <>
        <h2>Projects</h2>
        {isAdmin && <Button onClick={onOpen}>Add project</Button>}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <AddProject />
            </ModalBody>
          </ModalContent>
        </Modal>

        {projects && <BasicTable tableData={projects} COLUMNS={COLUMNS} />}
      </>
    )
  );
};

export default Projects;
