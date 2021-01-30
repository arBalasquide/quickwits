import React from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Flex,
} from "@chakra-ui/react";
import FocusLock from "react-focus-lock";
import { useDisclosure } from "@chakra-ui/react";

export const MyPopover = ({ form, buttonName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex p={10}>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button colorScheme="blue">{buttonName}</Button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton color="white" />
            {form()}
          </FocusLock>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default MyPopover;
