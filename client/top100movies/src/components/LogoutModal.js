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

export default function LogoutModal({ logOut }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
                onClose();
                logOut();
              }}
              mr={3}
              colorScheme="blue"
            >
              Log Out
            </Button>
            <Button>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
