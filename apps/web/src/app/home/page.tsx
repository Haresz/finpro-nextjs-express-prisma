'use client';
import MenuCategory from '@/components/MenuCategory';
import HeroLanding from '@/components/HeroLanding';
import ListEvent from '@/components/ListEvent';
import ModelAddEvent from '@/components/ModalAddEvent';
import { ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const OverlayOne = () => <ModalOverlay bg="rgba(0, 34, 77, 0.66)" />;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <div>
      <Navbar />
      <HeroLanding
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      />
      <MenuCategory />
      <ListEvent />
      <ModelAddEvent isOpen={isOpen} onClose={onClose} overlay={overlay} />
      <Footer />
    </div>
  );
}
