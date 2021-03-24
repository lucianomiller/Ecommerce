import React from 'react'
import Modal from "@material-ui/core/Modal";
import NewUserForm from "../UserForm/UserForm";

function NewUserModal({ isModalOpen, onClose }) {
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
        <NewUserForm onCreate={onClose} />
      </Modal>
    )
}

export default NewUserModal
