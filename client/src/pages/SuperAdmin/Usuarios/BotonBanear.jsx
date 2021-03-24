import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { putBannedUser } from "../../../api";
import { Context } from "./UsuariosContext";

const useStyles = makeStyles((theme) => ({
  banear: {
    color: "white",
    borderRadius: "20px",
    background: "#F7685B",
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#ac483f",
    },
  },
}));

function BotonBanear() {
  const context = useContext(Context);

  const classes = useStyles();
  return (
    <Button
      variant="contained"
      disableElevation
      className={classes.banear}
      startIcon={<DeleteIcon />}
      onClick={() => {
        Promise.all(
          context.ids.map((baneado) =>
            putBannedUser({ id: baneado, banned: true })
          )
        ).then(() => context.getAllUsers());
      }}
    >
      Bannear Usuario
    </Button>
  );
}

export default BotonBanear;
