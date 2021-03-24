import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  title: {
    color: "white",
    backgroundColor: "black",
  },
  second: {
    color: "white",
    backgroundColor: "grey",
  },
});

function Row(props) {
  const { ord } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  /* const [total, setTotal] = React.useState(0); */

  function total(arr) {
    let sum = 0;
    arr.forEach(function (numero) {
      sum += numero.price * numero.ProductoDeOrden.cantidad;
    });
    return sum;
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleChange = (event) => {
    axios.put(`http://localhost:3001/orden/${ord.id}`, {
      state: event.target.value,
    });
    /* setAge(event.target.value); */
  };

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
        <TableCell component="th" scope="row">
          {ord.createdAt.slice(0, 10)}
        </TableCell>
        {/* <TableCell align="center">{capitalizeFirstLetter(ord.user.firstName)+" "+capitalizeFirstLetter(ord.user.lastName) }</TableCell> */}
        <TableCell align="center">{ord.id}</TableCell>
        {/* <TableCell align="center">{ord.state}</TableCell> */}
        <TableCell align="center">
          <FormControl style={{ minWidth: 120 }}>
            <NativeSelect defaultValue={ord.state} onChange={handleChange}>
              <option value={"creado"}>Creado</option>
              <option value={"procesando"}>Procesado</option>
              <option value={"cancelado"}>Cancelado</option>
              <option value={"completado"}>Completado</option>
            </NativeSelect>
          </FormControl>
        </TableCell>
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
                      Precio Unitario ($)
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

export default function CollapsibleTable(props) {
  const classes = useRowStyles();
  const { fil } = props;
  //console.log(fil)
  /* const [orden, setOrden] = React.useState([]);

  React.useState(() => {
    
    axios.get(`http://localhost:3001/orden`)
    .then((ordenes)=>{
        console.log(ordenes)
        setOrden(ordenes.data)
    })

        console.log(orden);
    
  }, []); */

  const { orden } = useSelector((state) => state.ordens);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead className={classes.title}>
          <TableRow className={classes.title}>
            <TableCell />
            <TableCell className={classes.title}>Fecha de Compra</TableCell>
            <TableCell align="center" className={classes.title}>
              Usuario
            </TableCell>
            {/* <TableCell align="center" className={classes.title}>
              Orden de Compra
            </TableCell> */}
            <TableCell align="center" className={classes.title}>
              Estado
            </TableCell>
            <TableCell align="center" className={classes.title}>
              Precio de Compra ($)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orden.map((ord) => {
            //console.log(ord)
            //console.log(fil)
            if (ord.state.toLowerCase().includes(fil.toLowerCase()))
              return <Row key={ord.id} ord={ord} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
