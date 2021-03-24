import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import BuildIcon from "@material-ui/icons/Build";
import { putPromoveAdmin } from "../../../api";
import { Context } from "./ProductosContext";
import Modal from "@material-ui/core/Modal";
import ModalCrearCat from "./ModalCrearCat";

const useStyles = makeStyles((theme) => ({
  rol: {
    color: "white",
    borderRadius: "20px",
    background: "#2ED47A",
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#209455",
    },
  },
}));

function BotonCrear({ id }) {
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
        <ModalCrearCat id={id} />
      </Modal>
      <Button
        variant="contained"
        disableElevation
        className={classes.rol}
        startIcon={<BuildIcon />}
        onClick={handleOpen}
      >
        Crear Categorias
      </Button>
    </div>
  );
}

export default BotonCrear;
