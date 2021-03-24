import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LockIcon from "@material-ui/icons/Lock";
import { putForceResetUserPass } from "../../../api";
import { Context } from "./UsuariosContext";

const useStyles = makeStyles((theme) => ({
  reset: {
    color: "white",
    borderRadius: "20px",
    background: "#5B92E5",
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#3f66a0",
    },
  },
}));

function BotonReset() {
  const context = useContext(Context);
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      disableElevation
      className={classes.reset}
      startIcon={<LockIcon />}
      onClick={() => {
        Promise.all(
          context.ids.map((cambio) =>
            putForceResetUserPass({
              id: cambio,
              changePass: true,
            })
          )
        ).then(() => context.getAllUsers());
      }}
    >
      Resetear Contraseña
    </Button>
  );
}

export default BotonReset;
