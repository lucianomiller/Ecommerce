import React from "react";
import Modal from "@material-ui/core/Modal";
import NewCategoryForm from "../AddCategory";

function NewCategoryModal({ isModalOpen, onClose }) {
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
      <NewCategoryForm onCreate={onClose} />
    </Modal>
  );
}

export default NewCategoryModal;
