import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalOverlay,
} from "@chakra-ui/react";
import auth from "../services/authService";
import { useContext } from "react";
import UserContext from "../contexts/userContext";

export default function LogoutModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setLoggedIn } = useContext(UserContext);

  return (
    <>
      <Button onClick={onOpen}>Log Out</Button>
      <Modal isOpen={isOpen} onClose={onclose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log Out</ModalHeader>
          <ModalBody>Are you sure you want to log out?</ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                auth.logout();
                setLoggedIn(false);
                onClose();
              }}
              mr={3}
              colorScheme="blue"
            >
              Log Out
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
