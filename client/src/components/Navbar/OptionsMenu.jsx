import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Typography
} from "@material-ui/core";
import UserMenu from "./UserMenu";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    padding: theme.spacing(2, 3)
  }
}));

function OptionsMenu({ onClose, anchorEl }) {
  const classes = useStyles();
  const { isLoggedIn } = useSelector((state) => state.users.userData);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState();
  const theme = useTheme();
  const handleUserMenuOpen = (event) =>
    setUserMenuAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchorEl(null);
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <UserMenu anchorEl={userMenuAnchorEl} onClose={handleUserMenuClose} />
      {isLoggedIn ? (
        <MenuItem onClick={handleUserMenuOpen} className={classes.menuItem}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <Typography>Usuario</Typography>
        </MenuItem>
      ) : (
        <MenuItem component={Link} to="/login" className={classes.menuItem}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <Typography>Iniciar sesion</Typography>
        </MenuItem>
      )}

      <MenuItem className={classes.menuItem}>
        <Link
          onClick={onClose}
          to="/carrito"
          style={{
            textDecoration: "none",
            color: theme.palette.text.primary,
            display: "flex"
          }}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <Typography>Carrito</Typography>
        </Link>
      </MenuItem>
    </Menu>
  );
}

export default OptionsMenu;
