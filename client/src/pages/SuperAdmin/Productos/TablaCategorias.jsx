import React, { useEffect, useContext } from "react";
import { DataGrid } from "@material-ui/data-grid"; //npm install @material-ui/data-grid
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Context } from "./ProductosContext";
import { CardContent, Divider, Typography } from "@material-ui/core";

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
    context.getAllCategories();
  }, []);

  return (
    <div className={classes.root}>
      <Card className={classes.border}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Categorias
          </Typography>
          <div style={{ height: 380, width: "100%" }}>
            {Object.keys(context.categories).length > 0 && (
              <DataGrid
                pageSize={5}
                checkboxSelection
                onSelectionChange={(selection) => {
                  context.getIdsC(selection.rowIds);
                }}
                {...context.categories}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default Tabla;
