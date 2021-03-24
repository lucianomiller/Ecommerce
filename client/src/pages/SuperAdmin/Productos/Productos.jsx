import React from "react";
import { DataGrid } from "@material-ui/data-grid"; //npm install @material-ui/data-grid
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Divider, ListItem } from "@material-ui/core";
// import { PieChart, Pie, Sector, Cell } from "recharts";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import BuildIcon from "@material-ui/icons/Build";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CreateIcon from "@material-ui/icons/Create";
import Contexto from "./ProductosContext";
import TablaCategorias from "./TablaCategorias";
import TablaProductos from "./TablaProductos";
import BotonEliminarPro from "./BotonEliminarPro";
import BotonEliminarCat from "./BotonEliminarCat";
import BotonCrearCat from "./BotonCrearCat";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    flexDirection: "row",
  },
}));

function Productos() {
  const classes = useStyles();
  return (
    <Contexto>
      <Grid container spacing={3}>
        <Grid className={classes.modal} item xs={4} sm={12}>
          <BotonEliminarCat />
          <BotonCrearCat />
        </Grid>

        <Grid item xs={12} sm={5}>
          <TablaCategorias />
        </Grid>
        <Grid item xs={12} sm={12}>
          <BotonEliminarPro />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TablaProductos />
        </Grid>
      </Grid>
    </Contexto>
  );
}

export default Productos;
