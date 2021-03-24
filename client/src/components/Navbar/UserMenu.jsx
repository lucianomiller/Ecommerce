import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    textDecoration: "none",
    color: theme.palette.text.primary
  }
}));

function UserMenu({ anchorEl, onClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  let history = useHistory();

  const logout = () => {
    dispatch(logoutUser());
    history.push("/");
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "left" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={onClose}>
        <Link className={classes.menuItem} to="/profile">
          Mi Perfil
        </Link>
      </MenuItem>
      <MenuItem onClick={onClose}>
        <Link to="/history" className={classes.menuItem}>
          Historial
        </Link>
      </MenuItem>
      <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
    </Menu>
  );
}

export default UserMenu;
