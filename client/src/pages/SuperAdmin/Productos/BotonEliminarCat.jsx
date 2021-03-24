import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteCategory } from "../../../api";
import { Context } from "./ProductosContext";

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

function BotonEliminar() {
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
          context.idsC.map((item) => {
            deleteCategory(item);
          })
        ).then(() => context.getAllCategories());
      }}
    >
      Eliminar Categorias
    </Button>
  );
}

export default BotonEliminar;
