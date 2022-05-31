import { useEffect, useContext, useState } from "react";
import {
  Center,
  useDisclosure,
  Container,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import auth from "../services/authService";
import UserContext from "../contexts/userContext";

export default function LoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [helpMessage, setHelpMessage] = useState(
    "We'll never share your email."
  );
  const { setUser, isLoggedIn, setLoggedIn } = useContext(UserContext);

  const handleSubmit = async () => {
    if (username === "") {
      setHelpMessage("Email is required.");
      return;
    }

    if (password === "") {
      setHelpMessage("Password is required.");
      return;
    }

    const loginSuccessful = await auth.login(username, password);

    if (loginSuccessful) {
      const loggedInUser = await auth.getCurrentUser();

      setUser(loggedInUser);
      setLoggedIn(true);

      onClose();
    } else setHelpMessage("Incorrect username or password");
  };

  useEffect(() => {
    let isMounted = true;

    return () => {
      isMounted = false;
    };
  });

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Log In
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <Container>
            <ModalHeader>Log In</ModalHeader>
            <ModalCloseButton />
            <FormControl>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                variant="filled"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
              />
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="email"
                variant="filled"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
              />
              <FormHelperText>{helpMessage}</FormHelperText>
            </FormControl>
          </Container>

          <ModalFooter>
            <Button
              onClick={() => handleSubmit(username, password)}
              colorScheme="blue"
              mr={3}
            >
              Log In
            </Button>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
