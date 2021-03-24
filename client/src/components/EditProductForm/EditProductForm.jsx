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
import { modifyProduct } from "../../redux/actions/productsActions";
import { getCategories } from "../../api";
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

function ProductForm({ id }) {
  const dispatch = useDispatch();
  const [categories, setCategories] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  React.useEffect(() => {
    getCategories()
      .then((resp) => {
        const newCats = resp.data.map((cat) => {
          return {
            ...cat,
            isSelected: false
          };
        });
        setCategories(newCats);
        return newCats;
      })
      .then((nCat) => {
        axios.get(`http://localhost:3001/products/`).then((resp) => {
          const prod = resp.data.find((producto) => producto.id === id);
          if (!prod) return alert("Producto no existe");
          setFormData({
            nombre: prod.name,
            descripcion: prod.description,
            stock: prod.stock,
            precio: prod.price
          });

          const newCategories = nCat.map((cat) => {
            if (prod.category.some((prodCat) => prodCat.id === cat.id)) {
              cat.isSelected = true;
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
          notSelectedCategories = sortCategoriesAlphabetically(
            notSelectedCategories
          );

          setCategories([...selectedCategories, ...notSelectedCategories]);
        });
      });
  }, [id]);

  const { form, categoriesWrapper } = useStyles();
  const [formData, setFormData] = React.useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCategories = categories.filter((cat) => cat.isSelected);
    if (selectedCategories.length === 0)
      return alert("Seleccione al menos una categoria");
    const finalData = {
      id,
      product: { ...formData },
      //categories: selectedCategories
      categories: categories
    };
    //console.log(finalData);
    dispatch(modifyProduct(finalData));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        <h1>Editar Producto</h1>
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
            inputProps={{ min: 1 }}
            required
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
            value={formData.stock}
            style={{ marginBottom: 16, marginLeft: 32, flexGrow: 1 }}
          />
        </div>
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

        <Button
          disabled={categories.length === 0}
          color="primary"
          variant="contained"
          type="submit"
        >
          Editar producto
        </Button>
      </Paper>
    </Container>
  );
}

//fasdfds
export default ProductForm;
