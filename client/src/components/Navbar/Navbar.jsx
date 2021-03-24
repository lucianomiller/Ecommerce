import React, { useState } from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import LogInModal from "../LogInModal/LogInModal";
import { deepPurple } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Avatar,
  Menu,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SearchBar from "../SearchBar/SearchBar";
import OptionsMenu from "./OptionsMenu";
import UserMenu from "./UserMenu";
import ToggleThemeButton from "./ToggleThemeButton";
import Badge from "@material-ui/core/Badge";
import useCart from "../../hooks/useCart";
import { ReactComponent as Logo } from "../../img/logo.svg";
import { ReactComponent as Icon } from "../../img/Icon.svg";

const useStyles = makeStyles((theme) => ({
  logo: {
    textDecoration: "none",
    color: "black"
  },
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    background: "#ff8000"
  },
  section: {
    display: "flex",
    width: "100%",
    padding: "4px 0",
    alignItems: "center",
    justifyContent: "space-between"
  },
  links: {
    listStyle: "none",
    display: "flex",
    padding: 0,
    margin: 0,
    marginLeft: 0,
    "& li": {
      "&:hover": {
        cursor: "pointer"
      }
    },
    "& li + li": {
      marginLeft: 15
    }
  },
  buttonsRight: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 0,
    margin: 0,
    color: "white",
    "& li": {
      "&:hover": {
        cursor: "pointer",
        textDecoration: "none"
      },

      "& li + li": {
        marginLeft: 2
      }
    }
  },
  chip: {
    textDecoration: "none",
    fontSize: "25px",
    color: "black"
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: "35px",
    height: "35px"
  },
  logotipo: {
    width: "120px",
    marginRight: theme.spacing(3)
  },
  icon: {
    width: "50px",
    marginRight: theme.spacing(3)
  },
  appBarLink: {
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
    margin: 0,
    padding: theme.spacing(0.5),
    "&:hover": {
      textDecoration: "underline"
    },
    "& *": {
      padding: 0,
      margin: 0,
      textDecoration: "none",
      color: theme.palette.primary.contrastText,
    },
  },
}));

const categoriasMenuOptions = [
  "Ferreteria",
  "Herramientas",
  "Pinturas",
  "Plomeria",
  "Electricidad",
  "Construcción",
  "Servicios e instalaciones",
  "Pisos y revestimientos",
  "Griferia",
  "Maderas"
];

function BottomLinks() {
  const classes = useStyles();
  const { isLoggedIn, role } = useSelector((state) => state.users.userData);
  const [catalogoAnchorEl, setcatalogoAnchorEl] = useState(null);

  const handleCatalogoClick = (e) => {
    setcatalogoAnchorEl(e.currentTarget);
  };

  const handleCatalogoClose = () => setcatalogoAnchorEl(null);

  return (
    <ul className={classes.links}>
      <li className={classes.appBarLink}>
        <p onClick={handleCatalogoClick}>
          <Typography variant="body1">Categorias</Typography>
        </p>
        <Menu
          id="simple-menu"
          anchorEl={catalogoAnchorEl}
          keepMounted
          open={Boolean(catalogoAnchorEl)}
          onClose={handleCatalogoClose}
        >
          {categoriasMenuOptions.map((category) => (
            <MenuItem
              component={Link}
              to={`/result?categories=${category.toLowerCase()}`}
              onClick={handleCatalogoClose}
            >
              {category}
            </MenuItem>
          ))}
        </Menu>
      </li>
      <li className={classes.appBarLink}>
        <Link to="/contacto">
          <Typography variant="body1">Contacto</Typography>
        </Link>
      </li>
      {isLoggedIn && role == "company" && (
        <li className={classes.appBarLink}>
          <Link to="/dashboard">
            <Typography variant="body1">Dashboard</Typography>
          </Link>
        </li>
      )}
      {isLoggedIn && role == "admin" && (
        <li>
          <Link to="/admin" className={classes.appBarLink}>
            <Typography variant="body1">Dashboard</Typography>
          </Link>
        </li>
      )}
    </ul>
  );
}

function Navbar() {
  const classes = useStyles();
  const { itemsOnCart } = useCart();

  const { isLoggedIn, iniciales } = useSelector(
    (state) => state.users.userData
  );

  const [optionsMenuAnchorEl, setOptionsMenuAnchorEl] = useState();
  const handleOptionsMenuOpen = (event) =>
    setOptionsMenuAnchorEl(event.currentTarget);
  const handleOptionsMenuClose = () => setOptionsMenuAnchorEl(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState();
  const handleUserMenuOpen = (event) =>
    setUserMenuAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchorEl(null);

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <div className={classes.section}>
          <Hidden only="xs">
            <Link to="/">
              <Logo className={classes.logotipo} />
            </Link>
          </Hidden>
          <Hidden smUp>
            <Link to="/">
              <Icon className={classes.icon} />
            </Link>
          </Hidden>
          <SearchBar />

          {/* desktop */}
          <Hidden smDown>
            {!isLoggedIn ? (
              <>
                <LogInModal
                  isModalOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
                <ul className={classes.buttonsRight}>
                  <li stile={{ marginTop: 1 }}>
                    <Link
                      to="/login"
                      style={{
                        textDecoration: "none",
                        color: "black"
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{
                          marginLeft: 15,
                          whiteSpace: "nowrap"
                        }}
                      >
                        Iniciar Sesion
                      </Typography>
                    </Link>
                  </li>

                  <li>
                    <Link to="/carrito" style={{ color: "#fff" }}>
                      <IconButton aria-label="cart">
                        <Badge badgeContent={itemsOnCart} color="secondary">
                          <ShoppingCartIcon className={classes.chip} />
                        </Badge>
                      </IconButton>
                    </Link>
                  </li>
                  <li>
                    <ToggleThemeButton />
                  </li>
                </ul>
              </>
            ) : (
              <>
                <UserMenu
                  anchorEl={userMenuAnchorEl}
                  onClose={handleUserMenuClose}
                />

                <ul className={classes.buttonsRight}>
                  <li>
                    <IconButton
                      style={{ textDecoration: "none" }}
                      onClick={handleUserMenuOpen}
                      color="inherit"
                    >
                      <Avatar className={classes.purple}>{iniciales}</Avatar>
                    </IconButton>
                  </li>

                  <li>
                    <Link to="/carrito" style={{ color: "#fff" }}>
                      <IconButton aria-label="cart">
                        <Badge badgeContent={itemsOnCart} color="secondary">
                          <ShoppingCartIcon className={classes.chip} />
                        </Badge>
                      </IconButton>
                    </Link>
                  </li>
                  <li>
                    <ToggleThemeButton />
                  </li>
                </ul>
              </>
            )}
          </Hidden>

          {/* mobile / tablet */}
          <Hidden mdUp>
            <OptionsMenu
              onClose={handleOptionsMenuClose}
              anchorEl={optionsMenuAnchorEl}
            />
            <IconButton
              style={{ color: "black", marginLeft: 15 }}
              onClick={handleOptionsMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </Hidden>
        </div>
        <div className={classes.section}>
          <BottomLinks />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
