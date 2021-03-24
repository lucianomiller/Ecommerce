import React, { useState } from "react";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import PersonIcon from "@material-ui/icons/Person";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

import {deleteUser, forceResetUserPass, promoveAdmin} from "../../redux/actions/userActions"

import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import ItemsList from "./ItemsList/ItemsList";
import ListItem from "./ItemsList/ListItem";
import NewUserModal from "../../components/NewUserModal/NewUserModal";

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
function User({ userName, firstName, lastName, email, id, banned,role, changePass }) {
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isChangePassModalOpen, setIsChangePassModalOpen] = React.useState(false);
  const [isChangeRolModalOpen, setIsChangeRolModalOpen] = React.useState(false);
  const userData = {
    id,
    banned,
    changePass,
    role
  }

  return (
    <>
    <ConfirmationModal
        isModalOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => dispatch(deleteUser(userData))}
        title={`Estas seguro de que quieres eliminar el usuario "${userName}"?`}
      />
        <ConfirmationModal
         isModalOpen={isChangePassModalOpen}
         onRequestClose={() => setIsChangePassModalOpen(false)}
         onConfirm={() => {
          dispatch(forceResetUserPass(userData))}}
         title={`Estas seguro de que resetear la contraseña del usuario "${userName}"?`}
       />
       <ConfirmationModal
         isModalOpen={isChangeRolModalOpen}
         onRequestClose={() => setIsChangeRolModalOpen(false)}
         onConfirm={() => dispatch(promoveAdmin(userData))}
         title={`Estas seguro que quiere promover a: "${userName}" a Admin?`}
       />
      <ListItem
        nestedText={` Id: ${id} -- Nombres: ${firstName} -- Apellidos: ${lastName} -- Rol: ${role}`}
        primary={userName}
        secondary={"email: " + email}
        buttons={
          <>
          <IconButton
             onClick={() => setIsDeleteModalOpen(true)}
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
             onClick={() => setIsChangePassModalOpen(true)}
              color="secondary"
            >
              <RotateLeftIcon />
            </IconButton>
            <IconButton
             onClick={() => setIsChangeRolModalOpen(true)}
              color="secondary"
            >
              <SupervisorAccountIcon />
            </IconButton>
          </>
        }
      />
      
    </>
  );
}
function Users() {
  const { listClass, loading } = useStyles();
  const [searchFilter, setSearchFilter] = React.useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    users,
    isCreatingUser,
    isFetchingUsers,
    isCreatingUserError
  } = useSelector((state) => state.users);

  // console.log('esto es error users', isCreatingUserError)
  return (
    <>
      <NewUserModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ItemsList
        title={<Typography variant="h5">Usuarios</Typography>}
        subtitle={users.length + " usuarios"}
        action={
          <IconButton
            disabled={isCreatingUser}
            onClick={() => setIsModalOpen(true)}
            color="primary"
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
        }
        avatar={<PersonIcon fontSize="large" />}
        body={
          isFetchingUsers ? (
            <div className={loading}>
              <CircularProgress />
            </div>
          ) : users.length > 0 ? (
            <List className={listClass} component="nav">
              {users.map((usr) => {
                //  console.log(usr.firstName)
                if (
                  usr.firstName
                    .toLowerCase()
                    .includes(searchFilter.toLocaleLowerCase()) 
                )
                  return (
                    <User
                      firstName={usr.firstName}
                      lastName={usr.lastName}
                      userName={usr.userName}
                      email={usr.email}
                      role={usr.role}
                      banned={usr.banned}
                      changePass={usr.changePass}
                      id={usr.id}
                      key={usr.id}
                    />
                  );
              })}
            </List>
          ) : (
            <Typography className={loading} variant="h5">
              No hay Usuarios
            </Typography>
          )
        }
        searchLabel={"Buscar usuarios"}
        searchValue={searchFilter}
        searchOnChange={(e) => setSearchFilter(e.target.value)}
      />
    </>
  );
}

export default Users;
