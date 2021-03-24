import React from "react";
import Modal from "@material-ui/core/Modal";
import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterModal({ isModalOpen, onClose }) {
  return (
    <Modal
      style={{
        display: "grid",
        placeItems: "center",
        overflow: "auto",
        backgroundColor: "#E49012"
      }}
      open={isModalOpen}
      onClose={onClose}
    >
      <RegisterForm onCreate={onClose} />
    </Modal>
  );
}

export default RegisterModal;
