import React from "react";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import CategoryIcon from "@material-ui/icons/Category";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch } from "react-redux";
import { removeCategory } from "../../redux/actions/categoryActions";

import EditCategoryForm from "../../components/EditCategoryForm/EditCategoryForm";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import ListItem from "./ItemsList/ListItem";
import ItemsList from "./ItemsList/ItemsList";
import NewCategoryModal from "../../components/NewCategoryModal/NewCategoryModal";

const useStyles = makeStyles((theme) => ({
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
}));

function Category({ id, name, description }) {
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  return (
    <>
      <ConfirmationModal
        isModalOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => dispatch(removeCategory(id))}
        title={`Estas seguro de que quieres eliminar la categoría "${name}"?`}
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
        <EditCategoryForm id={id} onEdit={() => setIsDeleteModalOpen(false)} />
      </Modal>
      <ListItem
        key={id}
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

function Categories() {
  const { listClass, loading } = useStyles();
  const [searchFilter, setSearchFilter] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { categories, isFetchingCategories } = useSelector(
    (state) => state.categories
  );

  return (
    <>
      <NewCategoryModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ItemsList
        title={<Typography variant="h5">Categorías</Typography>}
        subtitle={categories.length + " categorías"}
        action={
          <IconButton onClick={() => setIsModalOpen(true)} color="primary">
            <AddCircleIcon fontSize="large" />
          </IconButton>
        }
        avatar={<CategoryIcon fontSize="large" />}
        body={
          isFetchingCategories ? (
            <div className={loading}>
              <CircularProgress />
            </div>
          ) : categories.length > 0 ? (
            <List className={listClass} component="nav">
              {categories.map((cat) => {
                if (cat.name.toLowerCase().includes(searchFilter.toLowerCase()))
                  return (
                    <Category
                      key={cat.id}
                      description={cat.description}
                      name={cat.name}
                      id={cat.id}
                    />
                  );
              })}
            </List>
          ) : (
            <Typography className={loading} variant="h5">
              No hay categorías
            </Typography>
          )
        }
        searchLabel={"Buscar categorías"}
        searchValue={searchFilter}
        searchOnChange={(e) => setSearchFilter(e.target.value)}
      />
    </>
  );
}

export default Categories;
