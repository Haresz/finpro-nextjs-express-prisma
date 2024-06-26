import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import Btn from './Btn';
import { switchRole } from '@/api/auth';

export default function ModalAddevent(props: any) {
  const actionSwitch = async () => {
    const token = localStorage.getItem('token');
    const id: any = localStorage.getItem('id');
    try {
      props.onClose();
      const response = await switchRole(id, token);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal onClose={props.onClose} isCentered size={'md'} isOpen={props.isOpen}>
      <ModalOverlay />
      <ModalContent justifyContent={'center'}>
        <ModalCloseButton />
        <Box className="py-6">
          <ModalBody>
            <Heading color={'#5D0E41'} textAlign={'center'} as="h2" size="lg">
              Are you sure you want to become an EO?
            </Heading>
          </ModalBody>
          <ModalFooter justifyContent={'center'}>
            <Btn onClick={() => actionSwitch()} title={'VERIFIKASI'} />
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
}
