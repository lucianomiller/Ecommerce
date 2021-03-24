import React from "react";
import CardCarrito from "./CardCarrito/CardCarrito";
import {
  Container,
  Paper,
  Divider,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import useCart from "../../hooks/useCart";
import { mercadoPago, myOrden } from "../../api";

const useStyles = makeStyles((theme) => ({
  top: {
    boxShadow: "0 4px 4px rgba(0,0,0,0.075)",
    padding: 30,
    display: "flex",
    justifyContent: "space-between",
  },
  bottom: {
    boxShadow: "0 -4px 4px rgba(0,0,0,0.075)",
    padding: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  emptyIcon: {
    color: theme.palette.error.main,
  },
}));

const Carrito = () => {
  const classes = useStyles();
  const { cart, emptyCart, totalPrice } = useCart();
  const thereAreItems = cart && cart.length > 0;

  React.useEffect(() => {
    document.title = "Carrito";
  }, []);

  function pago() {
    var arreglo = [];
    var x = {
      objArray1: {},
      objArray2: {},
    };
    for (var i in cart) {
      var item = cart[i];
      arreglo.push({
        id: item.id,
        title: item.name,
        unit_price: item.price,
        quantity: item.amount,
      });
    }
    return arreglo;
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: 35, marginBottom: 35 }}>
      <Paper style={{ overflow: "hidden" }}>
        <div className={classes.top}>
          <Typography variant="h5">Carrito</Typography>

          <Button
            variant="outlined"
            className={classes.emptyIcon}
            color="inherit"
            startIcon={<DeleteIcon />}
            onClick={emptyCart}
            disabled={!thereAreItems}
          >
            Vaciar carrito
          </Button>
        </div>
        <div className={classes.content}>
          {thereAreItems ? (
            cart.map((product) => (
              <React.Fragment key={product.id}>
                <Divider />
                <CardCarrito product={product} />
              </React.Fragment>
            ))
          ) : (
            <Typography
              style={{ textAlign: "center", padding: 40 }}
              variant="h4"
            >
              No hay productos en el carrito
            </Typography>
          )}
        </div>
        <div className={classes.bottom}>
          <Typography style={{ marginBottom: 30 }} variant="h5">
            Total: ${totalPrice}
          </Typography>
          <Button
            disabled={!thereAreItems}
            variant="contained"
            color="primary"
            onClick={() => {
              mercadoPago(pago()).then((res) =>
                window.location.replace(res.data)
              );
            }}
          >
            Comprar
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Carrito;
