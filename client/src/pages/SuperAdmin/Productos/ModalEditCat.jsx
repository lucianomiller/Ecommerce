import React, { useContext, useEffect } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Context } from "./ProductosContext";
import { getCategory, putCategory } from "../../../api";
import { CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  div: {
    width: "300px",
    height: "300px",
  },
}));

export default function ModalEditCat({ id }) {
  const classes = useStyles();
  const context = useContext(Context);
  const [cat, setCat] = React.useState(" ");

  const handleChange = (event) => {
    setCat(event.target.value);
  };

  useEffect(() => {
    getCategory(id).then((result) => setCat(result.data.name));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    putCategory({ id, name: cat }).then(() => context.getAllCategories());
  };

  return (
    <div className={classes.div}>
      <Card component="form" onSubmit={handleSubmit} className={classes.modal}>
        <CardContent className={classes.card}>
          <TextField label="Categoria" value={cat} onChange={handleChange} />
          <Button type="submit">Confirmar</Button>
        </CardContent>
      </Card>
    </div>
  );
}
