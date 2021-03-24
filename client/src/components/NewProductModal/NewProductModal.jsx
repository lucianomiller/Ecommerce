import React from "react";
import Modal from "@material-ui/core/Modal";
import NewProductForm from "../ProductForm/ProductForm";

function NewProductModal({ isModalOpen, onClose }) {
  return (
    <Modal
      style={{
        display: "grid",
        placeItems: "center",
        overflow: "auto"
      }}
      open={isModalOpen}
      onClose={onClose}
    >
      <NewProductForm onCreate={onClose} />
    </Modal>
  );
}

export default NewProductModal;
