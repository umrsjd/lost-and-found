import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #001F3F;
  color: #FFFFFF;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 90%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  background-color:rgb(255, 255, 255); // Change input background to blue
  color:rgb(0, 0, 0); // Ensure text is visible
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  resize: none;
  background-color:rgb(255, 255, 255); // Change textarea background to blue
  color:rgb(0, 0, 0); // Ensure text is visible
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background:rgb(255, 255, 255);
  color: #001F3F;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  &:hover {
    background:rgb(255, 255, 255);
  }
`;

function PostItemForm({ isOpen, onClose }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <Modal
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3>Post Found Item</h3>
        <Form onSubmit={handleFormSubmit}>
          <Input type="text" placeholder="Name" required />
          <Input type="email" placeholder="Email" required />
          <Input type="tel" placeholder="Phone" required />
          <Input type="text" placeholder="Title" required />
          <TextArea placeholder="Description" rows="4" required />
          <Input type="file" accept="image/*" required />
          <SubmitButton type="submit">Post</SubmitButton>
        </Form>
      </Modal>
    </>
  );
}

export default PostItemForm;