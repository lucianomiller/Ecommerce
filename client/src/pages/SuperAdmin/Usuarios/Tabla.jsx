import React, { useEffect, useContext } from "react";
import { DataGrid } from "@material-ui/data-grid"; //npm install @material-ui/data-grid
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Context } from "./UsuariosContext";
import { CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  border: {
    borderRadius: "20px",
  },
});

function Tabla() {
  const context = useContext(Context);
  const classes = useStyles();

  useEffect(() => {
    context.getAllUsers();
  }, []);

  return (
    <Card className={classes.border}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Usuarios
        </Typography>
        <div style={{ height: 800, width: "100%" }}>
          {Object.keys(context.users).length > 0 && (
            <DataGrid
              pageSize={9}
              checkboxSelection
              onSelectionChange={(selection) => {
                context.getIds(selection.rowIds);
              }}
              {...context.users}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
export default Tabla;
