import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import BuildIcon from "@material-ui/icons/Build";
import { putPromoveAdmin } from "../../../api";
import { Context } from "./UsuariosContext";

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

function BotonCambiar() {
  const context = useContext(Context);
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      disableElevation
      className={classes.rol}
      startIcon={<BuildIcon />}
      onClick={() => {
        Promise.all(
          context.ids.map((promovido) =>
            putPromoveAdmin({
              id: promovido,
              role: "admin",
              banned: false,
              changePass: false,
            })
          )
        ).then(() => context.getAllUsers());
      }}
    >
      Promovear Rol
    </Button>
  );
}

export default BotonCambiar;
