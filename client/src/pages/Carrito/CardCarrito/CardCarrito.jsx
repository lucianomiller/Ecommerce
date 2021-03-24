import React from "react";
import { Typography, TextField, Button, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core/styles";
import useCart from "../../../hooks/useCart";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    padding: 30
  },
  image: {
    height: 110,
    width: 110,
    objectFit: "cover",
    objectPosition: "center"
  },
  topArea: {
    paddingTop: 30,
    paddingRight: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between"
  },
  productTitle: {
    width: 200,
    maxWidth: 200,
    textTransform: "capitalize",
    wordBreak: "break-word"
  },
  individualPrice: {
    color: theme.palette.text.secondary
  },
  amountGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  removeIcon: {
    marginLeft: 15,
    color: theme.palette.error.main
  }
}));

const CardCarrito = ({ product }) => {
  const {
    addOneAmountTo,
    removeOneAmountFrom,
    cart,
    updateAmount,
    removeProduct
  } = useCart();
  const [amountSelected, setAmountSelected] = React.useState();

  React.useEffect(() => {
    setAmountSelected(cart.find((prod) => prod.id === product.id).amount);
  }, [cart, product]);

  const handleChangeAmountSelected = (e) => {
    setAmountSelected(e.target.value);
  };

  const handleBlur = () => {
    if (amountSelected > product.stock) {
      updateAmount(product.id, product.stock);
    } else if (amountSelected < 1) {
      updateAmount(product.id, 1);
    } else {
      updateAmount(product.id, amountSelected);
    }
  };

  const classes = useStyles();
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={product.img} alt={product.name} />
      </div>
      <div className={classes.topArea}>
        <Typography className={classes.productTitle} variant="h6">
          {product.name}
          <Typography className={classes.individualPrice} variant="body2">
            En stock: {product.stock}
          </Typography>
        </Typography>

        <Typography className={classes.individualPrice} variant="body1">
          ${product.price}
        </Typography>
        <div className={classes.amountGroup}>
          <Button
            style={{ alignSelf: "stretch" }}
            onClick={() => removeOneAmountFrom(product.id)}
            size="small"
            variant="outlined"
          >
            <RemoveIcon />
          </Button>
          <TextField
            variant="outlined"
            style={{ margin: "0 10px" }}
            type="number"
            inputProps={{ min: 1, max: product.stock }}
            onChange={handleChangeAmountSelected}
            onBlur={handleBlur}
            value={amountSelected}
          />
          <Button
            style={{ alignSelf: "stretch" }}
            onClick={() => addOneAmountTo(product.id)}
            variant="outlined"
          >
            <AddIcon />
          </Button>
          <IconButton
            className={classes.removeIcon}
            onClick={() => removeProduct(product.id)}
          >
            <CancelIcon />
          </IconButton>
        </div>
        <Typography variant="h6">${product.price * product.amount}</Typography>
      </div>
    </div>
  );
};
export default CardCarrito;
