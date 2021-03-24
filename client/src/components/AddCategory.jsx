import React, { useState } from "react";
import { TextField, Button, Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

import { createCategory } from "../redux/actions/categoryActions";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(4)
  }
}));

function AddCategory({ onCreate }) {
  const dispatch = useDispatch();
  const { form } = useStyles();
  const [category, setCategory] = useState({
    name: "",
    description: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory(category));
    onCreate && onCreate();
  };

  const handleaOnChange = (e) => {
    const { value, name } = e.target;
    setCategory({ ...category, [name]: value });
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={2}
        component="form"
        className={form}
        onSubmit={handleSubmit}
      >
        <h1>Nueva Categoría</h1>

        <TextField
          label="Nombre"
          required
          onChange={handleaOnChange}
          name="name"
          value={category.name}
        />

        <TextField
          label="Descripción"
          onChange={handleaOnChange}
          name="description"
          value={category.description}
          style={{ marginBottom: 16 }}
        />
        <Button color="primary" variant="contained" type="submit">
          Crear categoría
        </Button>
      </Paper>
    </Container>
  );
}

export default AddCategory;
