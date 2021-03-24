import React from "react";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../redux/actions/productsActions";

import EditProductForm from "../../components/EditProductForm/EditProductForm";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import ItemsList from "./ItemsList/ItemsList";
import ListItem from "./ItemsList/ListItem";
import NewProductModal from "../../components/NewProductModal/NewProductModal";

const useStyles = makeStyles({
  listClass: {
    maxHeight: 500,
    minHeight: 500,
    overflow: "auto"
  },
  loading: {
    maxHeight: 500,
    minHeight: 500,
    display: "grid",
    placeItems: "center"
  }
});

function Product({ name, description, id }) {
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  return (
    <>
      <ConfirmationModal
        isModalOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => dispatch(removeProduct(id))}
        title={`Estas seguro de que quieres eliminar el producto "${name}"?`}
      />
      <Modal
        style={{
          display: "grid",
          placeItems: "center",
          overflow: "auto"
        }}
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <EditProductForm id={id} />
      </Modal>
      <ListItem
        nestedText={description}
        primary={name}
        secondary={"Id: " + id}
        buttons={
          <>
            <IconButton onClick={() => setIsEditModalOpen(true)}>
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => setIsDeleteModalOpen(true)}
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          </>
        }
      />
    </>
  );
}

function Products() {
  const { listClass, loading } = useStyles();
  const [searchFilter, setSearchFilter] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { products, isCreatingProduct, isFetchingProducts } = useSelector(
    (state) => state.products
  );

  return (
    <>
      <NewProductModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ItemsList
        title={<Typography variant="h5">Productos</Typography>}
        subtitle={products.length + " productos"}
        action={
          <IconButton
            disabled={isCreatingProduct}
            onClick={() => setIsModalOpen(true)}
            color="primary"
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
        }
        avatar={<ShoppingCartIcon fontSize="large" />}
        body={
          isFetchingProducts ? (
            <div className={loading}>
              <CircularProgress />
            </div>
          ) : products.length > 0 ? (
            <List className={listClass} component="nav">
              {products.map((cat) => {
                if (cat.name.toLowerCase().includes(searchFilter.toLowerCase()))
                  return (
                    <Product
                      name={cat.name}
                      description={cat.description}
                      id={cat.id}
                      key={cat.id}
                    />
                  );
              })}
            </List>
          ) : (
            <Typography className={loading} variant="h5">
              No hay productos
            </Typography>
          )
        }
        searchLabel={"Buscar productos"}
        searchValue={searchFilter}
        searchOnChange={(e) => setSearchFilter(e.target.value)}
      />
    </>
  );
}

export default Products;
