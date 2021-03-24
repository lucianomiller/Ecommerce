import React from "react";
import {
  TextField,
  InputAdornment,
  Chip,
  Button,
  Container,
  Paper
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/actions/productsActions";
import axios from "axios";

const sortCategoriesAlphabetically = (categories) => {
  return categories.sort((cat, nextCat) => {
    let fa = cat.name.toLowerCase(),
      fb = nextCat.name.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 1;
  });
};

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(4)
  },
  categoriesWrapper: {
    maxHeight: 200,
    overflow: "auto",
    margin: "10px 0",
    "& > div": {
      marginTop: 5,
      marginRight: 5
    }
  }
}));

function ProductForm({ onCreate }) {
  const dispatch = useDispatch();
  const [categories, setCategories] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  React.useEffect(() => {
    axios.get("http://localhost:3001/products/category/").then((resp) => {
      setCategories(
        resp.data.map((cat) => {
          return {
            ...cat,
            isSelected: false
          };
        })
      );
    });
  }, []);

  const { form, categoriesWrapper } = useStyles();
  const [formData, setFormData] = React.useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    uploadedImages: ""
  });
  const [flag, setFlag] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCategories = categories.filter((cat) => cat.isSelected);
    if (selectedCategories.length === 0)
      return alert("Seleccione al menos una categoria");
    const finalData = {
      product: { ...formData },
      categories: selectedCategories
    };
    if (finalData.product.uploadedImages === "") {
      delete finalData.product.uploadedImages;
    }
    dispatch(createProduct(finalData));

    onCreate && onCreate();
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // subir imagen al servidor

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Product");
    setFlag(true);
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/dtqd9ehbe/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    const url = file.secure_url;
    setFormData({ ...formData, uploadedImages: url });
    setFlag(false);
  };

  // subir imagen al servidor (aca termina el código)

  const handleCategoryChange = (id) => {
    const newCategories = categories.map((cat) => {
      if (cat.id === id) {
        cat.isSelected = !cat.isSelected;
      }
      return cat;
    });

    let selectedCategories = [];
    let notSelectedCategories = [];

    newCategories.forEach((cat) => {
      if (cat.isSelected) selectedCategories.push(cat);
      else notSelectedCategories.push(cat);
    });

    selectedCategories = sortCategoriesAlphabetically(selectedCategories);
    notSelectedCategories = sortCategoriesAlphabetically(notSelectedCategories);

    setCategories([...selectedCategories, ...notSelectedCategories]);
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={2}
        component="form"
        className={form}
        onSubmit={handleSubmit}
      >
        <h1>Nuevo Producto</h1>
        <TextField
          label="Nombre"
          required
          onChange={handleChange}
          name="nombre"
          value={formData.nombre}
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="Descripción"
          required
          onChange={handleChange}
          name="descripcion"
          value={formData.descripcion}
          style={{ marginBottom: 16 }}
        />
        <div style={{ display: "flex" }}>
          <TextField
            type="number"
            label="Precio"
            required
            inputProps={{ min: 1 }}
            onChange={handleChange}
            name="precio"
            value={formData.precio}
            style={{ marginBottom: 16, flexGrow: 1, marginRight: 32 }}
          />
          <TextField
            type="number"
            label="Stock"
            inputProps={{ min: 0 }}
            required
            onChange={handleChange}
            name="stock"
            // error={formData.stock === 0}
            // helperText
            value={formData.stock}
            style={{ marginBottom: 16, marginLeft: 32, flexGrow: 1 }}
          />
        </div>

        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          onChange={handleImageUpload}
          multiple
          type="file"
        />

        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          label="Categorías"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {categories.length > 0 ? (
          <div className={categoriesWrapper}>
            {categories.map((cat) => {
              if (cat.name.toLowerCase().includes(filter))
                return (
                  <Chip
                    key={cat.id}
                    label={cat.name}
                    clickable
                    color={`${cat.isSelected ? "primary" : "secondary"}`}
                    onClick={() => handleCategoryChange(cat.id)}
                    onDelete={() => handleCategoryChange(cat.id)}
                    deleteIcon={cat.isSelected ? <DoneIcon /> : <CloseIcon />}
                  />
                );
              else return null;
            })}
          </div>
        ) : (
          <h3 style={{ textAlign: "center", margin: "20px 0" }}>
            No hay categorías
          </h3>
        )}
        {formData.uploadedImages.length < 1 ? (
          <label htmlFor="raised-button-file">
            <Button
              style={{ width: "100%" }}
              color="primary"
              variant="outlined"
              component="span"
            >
              {flag ? "Cargando..." : "Enviar imagen"}
            </Button>
          </label>
        ) : (
          <Button
            type="button"
            onClick={() => setFormData({ ...formData, uploadedImages: "" })}
            color="secondary"
            variant="outlined"
          >
            Remover imágenes
          </Button>
        )}
        {formData.uploadedImages.length > 0 && <p>{1} archivo subido</p>}
        <Button
          disabled={categories.length < 1}
          color="primary"
          variant="contained"
          type="submit"
        >
          Crear producto
        </Button>
      </Paper>
    </Container>
  );
}

//fasdfds
export default ProductForm;
