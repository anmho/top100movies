import { useState } from "react";
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

export default function LoginModal({ login }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [helpMessage, setHelpMessage] = useState(
    "We'll never share your email."
  );

  const handleSubmit = () => {
    if (username === "") {
      setHelpMessage("Email is required.");
      return;
    }

    if (password === "") {
      setHelpMessage("Password is required.");
      return;
    }

    login(username, password);
  };

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
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormLabel htmlFor="password">Email address</FormLabel>
              <Input
                id="email"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
