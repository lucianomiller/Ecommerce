import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { putBannedUser } from "../../../api";
import { Context } from "./UsuariosContext";

const useStyles = makeStyles((theme) => ({
  activar: {
    color: "white",
    borderRadius: "20px",
    background: "#FFB946",
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#b28131",
    },
  },
}));

function BotonActivar() {
  const context = useContext(Context);
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      disableElevation
      className={classes.activar}
      startIcon={<EditIcon />}
      onClick={() => {
        Promise.all(
          context.ids.map((baneado) =>
            putBannedUser({ id: baneado, banned: false })
          )
        ).then(() => context.getAllUsers());
      }}
    >
      Activar Usuario
    </Button>
  );
}

export default BotonActivar;
