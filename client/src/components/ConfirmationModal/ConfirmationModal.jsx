import React from "react";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  titleStyle: {
    wordBreak: "break-word",
    whiteSpace: "normal"
  }
});

function ConfirmationModal({
  title,
  content,
  isModalOpen,
  onRequestClose,
  onConfirm,
  children
}) {
  const { titleStyle } = useStyles();

  return (
    <Modal
      style={{
        display: "grid",
        placeItems: "center",
        overflow: "auto"
      }}
      open={isModalOpen}
      onClose={() => onRequestClose()}
    >
      <Paper style={{ padding: 24, maxWidth: 400 }} elevation={2}>
        <Typography
          className={titleStyle}
          variant="h5"
          style={{ marginBottom: 32 }}
        >
          {title}
        </Typography>
        {content || children}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              onConfirm();
              onRequestClose();
            }}
            style={{ width: 90 }}
            variant="contained"
            color="secondary"
          >
            Si
          </Button>
          <Button
            onClick={() => onRequestClose()}
            style={{ width: 90, marginLeft: 25 }}
          >
            No
          </Button>
        </div>
      </Paper>
    </Modal>
  );
}

export default ConfirmationModal;
