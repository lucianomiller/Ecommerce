import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import BarChartIcon from "@material-ui/icons/BarChart";
import PersonIcon from "@material-ui/icons/Person";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import Productos from "./Productos/Productos";
import Usuarios from "./Usuarios/Usuarios";
import Ordenes from "../Dashboard/Ordenes";
import { ReactComponent as Logo } from "../../img/logo-naranja.svg";
import { fetchOrden } from "../../redux/actions/ordenActions";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    background: "#ff8000",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  color: {
    color: "black",
    fontSize: "20px",
  },
  logotipo: {
    width: "120px",
  },
  box: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    paddingTop: "10px",
  },
}));

function ResponsiveDrawer(props) {
  const dispatch = useDispatch();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchOrden());
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [titulo, setTitulo] = React.useState("Usuarios");

  const drawer = (
    <div>
      <Box className={classes.box}>
        <Link to="/">
          <Logo className={classes.logotipo} />
        </Link>
      </Box>
      <List>
        <ListItem button onClick={() => setTitulo("Usuarios")}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <Link
            to="/admin/usuarios"
            style={{
              color: "#7A7A7A",
              textDecoration: "none",
            }}
          >
            <ListItemText primary="Usuarios" />
          </Link>
        </ListItem>
        <ListItem button onClick={() => setTitulo("Productos")}>
          <ListItemIcon>
            <LocalOfferIcon />
          </ListItemIcon>
          <Link
            to="/admin/productos"
            style={{
              color: "#7A7A7A",
              textDecoration: "none",
            }}
          >
            <ListItemText primary="Productos" />
          </Link>
        </ListItem>
        <ListItem button onClick={() => setTitulo("Ordenes")}>
          <ListItemIcon>
            <LocalOfferIcon />
          </ListItemIcon>
          <Link
            to="/admin/ordenes"
            style={{
              color: "#7A7A7A",
              textDecoration: "none",
            }}
          >
            <ListItemText primary="Ordenes" />
          </Link>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.color}>{titulo}</Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/admin/" component={Usuarios} />
          <Route exact path="/admin/usuarios" component={Usuarios} />
          <Route exact path="/admin/productos" component={Productos} />
          <Route exact path="/admin/ordenes" component={Ordenes} />
        </Switch>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
