import React from 'react'
import Modal from "@material-ui/core/Modal";
import LoginForm from "../LogInForm/LogInForm"


function LogInModal({ isModalOpen, onClose }) {
    return (
        <Modal
        style={{
          display: "grid",
          placeItems: "center",
          overflow: "auto",
         // backgroundColor:'#E49012'
        }}
        open={isModalOpen}
        onClose={onClose}
      >
        <LoginForm onCreate={onClose} />
      </Modal>
    )
}

export default LogInModal
