import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import useCart from "../../hooks/useCart";

const useStyles = makeStyles((theme) => ({
  buyBtn: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  noStockBtn: {
    transition: "all 125ms linear",
    border: `1px solid ${theme.palette.error.main}`,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
      color: "#fff"
    }
  }
}));

function CardButton({ stock, productData, ...otherProps }) {
  const classes = useStyles();
  const { cart, isItemOnCart, addNewItemToCart } = useCart();
  const [isOnCart, setIsOnCart] = React.useState(false);
  const { isAddingItemToCart } = useSelector((state) => state.carrito);

  React.useEffect(() => {
    setIsOnCart(isItemOnCart(productData.id));
  }, [cart, isItemOnCart, productData]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addNewItemToCart(productData);
  };

  if (!stock)
    return (
      <Button
        {...otherProps}
        className={classes.noStockBtn}
        onClick={(e) => {
          e.stopPropagation();
          alert("Lo sentimos. No hay mas");
        }}
        classes={{ outlined: classes.noStockBtn }}
        variant="outlined"
      >
        No hay stock
      </Button>
    );

  if (isOnCart)
    return (
      <Button
        {...otherProps}
        onClick={(e) => e.stopPropagation()}
        className={classes.buyBtn}
        variant="contained"
        disabled
      >
        Agregado
      </Button>
    );
  else
    return (
      <Button
        {...otherProps}
        className={classes.buyBtn}
        disabled={isAddingItemToCart}
        onClick={handleAddToCart}
      >
        Comprar
      </Button>
    );
}

export default CardButton;
