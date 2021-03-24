import React, { useState } from "react";
import { TextField, Button, Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { modifyCategory } from "../../redux/actions/categoryActions";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(4)
  }
}));

function EditCategoryForm({ id, onEdit }) {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState({
    id: "",
    name: "",
    description: ""
  });

  React.useEffect(() => {
    axios.get(`http://localhost:3001/products/category`).then(({ data }) => {
      const categoria = data.find((cat) => cat.id === id);
      if (!categoria) alert("Categoria no existe");
      setCategoryData(categoria);
    });
  }, [id]);

  const { form } = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(modifyCategory(categoryData));
    onEdit && onEdit();
  };

  const handleaOnChange = (e) => {
    const { value, name } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={2}
        component="form"
        className={form}
        onSubmit={handleSubmit}
      >
        <h1>Editar Categoría</h1>

        <TextField
          label="Nombre"
          required
          onChange={handleaOnChange}
          name="name"
          value={categoryData.name}
        />

        <TextField
          label="Descripción"
          required
          onChange={handleaOnChange}
          name="description"
          value={categoryData.description}
          style={{ marginBottom: 16 }}
        />
        <Button
          color="primary"
          disabled={Object.keys(categoryData).length === 0}
          variant="contained"
          type="submit"
        >
          Editar categoría
        </Button>
      </Paper>
    </Container>
  );
}

export default EditCategoryForm;
