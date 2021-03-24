import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import ModalEditCat from "./ModalEditCat";

const useStyles = makeStyles((theme) => ({
  rol: {
    color: "white",
    borderRadius: "20px",
    background: "#FFB946",
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#b28131",
    },
  },
}));

function BotonCambiar({ id }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "grid",
          placeItems: "center",
          overflow: "auto",
        }}
      >
        <ModalEditCat id={id} />
      </Modal>
      <Button
        variant="contained"
        disableElevation
        className={classes.rol}
        startIcon={<EditIcon />}
        onClick={handleOpen}
      >
        Editar
      </Button>
    </div>
  );
}

export default BotonCambiar;
