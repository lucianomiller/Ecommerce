import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import axios from "axios";
import { useSelector } from "react-redux";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  },
  title: {
    color: "white",
    backgroundColor: "#E49012"
  },
  second: {
    color: "white",
    backgroundColor: "grey"
  },
  loading: {
    maxHeight: 200,
    minHeight: 200,
    display: "grid",
    placeItems: "center"
  }
});

function Row(props) {
  const { ord } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  /* const [total, setTotal] = React.useState(0); */

  function total(arr) {
    let sum = 0;
    //console.log(arr)
    arr.forEach(function (numero) {
      // console.log(numero)
      //console.log(numero)
      sum += numero.price * numero.ProductoDeOrden.cantidad;
    });
    return sum;
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {ord.createdAt.slice(0, 10)}
        </TableCell>
        {/* <TableCell align="center">{row.calories}</TableCell> */}
        <TableCell align="center">{ord.id}</TableCell>
        <TableCell align="center">{ord.state}</TableCell>
        {/* <TableCell align="center">{row.protein}</TableCell> */}
        <TableCell align="center">{total(ord.products)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                align="center"
                variant="h6"
                gutterBottom
                component="div"
              >
                Resumen
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow className={classes.second}>
                    <TableCell className={classes.second}>Producto</TableCell>
                    <TableCell className={classes.second} align="center">
                      Precio Unitario
                    </TableCell>
                    <TableCell className={classes.second} align="center">
                      Cantidad
                    </TableCell>
                    <TableCell className={classes.second} align="right">
                      Precio Total ($)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ord.products.map((prod) => (
                    <TableRow key={prod.id}>
                      <TableCell component="th" scope="row">
                        {prod.name}
                      </TableCell>
                      <TableCell align="center">{prod.price}</TableCell>
                      <TableCell align="center">
                        {prod.ProductoDeOrden.cantidad}
                      </TableCell>
                      <TableCell align="right">
                        {Math.round(
                          prod.price * prod.ProductoDeOrden.cantidad * 100
                        ) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const classes = useRowStyles();
  /* const { orden } = useSelector(
    (state) => state.ordens
  ); */
  const { isLoggedIn } = useSelector((state) => state.users.userData);

  let history = useHistory();
  const [orden, setOrden] = React.useState([]);

  React.useState(() => {
    axios
      .get(`http://localhost:3001/orden/myorden`, { withCredentials: true })
      .then((ordenes) => {
        console.log("logueado", ordenes.data);
        return setOrden(ordenes.data);
      })
      .catch((e) => {
        history.push("/login");
      });

    // console.log(orden);
  }, []);
  //const [orden1, setOrden1] = React.useState(orden[0]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead className={classes.title}>
            <TableRow className={classes.title}>
              <TableCell />
              <TableCell align="center" className={classes.title}>
                Fecha de Compra
              </TableCell>
              {/* <TableCell align="center" className={classes.title}>Usuario</TableCell> */}
              <TableCell align="center" className={classes.title}>
                Orden de Compra
              </TableCell>
              <TableCell align="center" className={classes.title}>
                Estado
              </TableCell>
              <TableCell align="center" className={classes.title}>
                Precio de Compra ($)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orden.length > 0 ? (
              orden.map((ord) =>{ 
                if (ord.state=="completado"||ord.state=="cancelado")
                return(  
                <Row key={ord.id} ord={ord} />)})
            ) : (
              <Typography
                variant="h5"
                className={classes.loading}
                align="center"
              >
                Aún no hay Compras
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
