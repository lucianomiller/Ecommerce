import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import BotonBanear from "./BotonBanear";
import BotonActivar from "./BotonActivar";
import BotonReset from "./BotonReset";
import BotonCambiar from "./BotonCambiar";
import Tabla from "./Tabla";
import Contexto from "./UsuariosContext";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function Usuarios() {
  const classes = useStyles();

  return (
    <Contexto>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div>
              <BotonBanear />
              <BotonActivar />
              <BotonReset />
              <BotonCambiar />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Tabla />
          </Grid>
        </Grid>
      </div>
    </Contexto>
  );
}
