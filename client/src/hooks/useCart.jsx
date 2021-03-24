import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useLocalStorageCarrito from "./useLocalStorageCarrito";
import {
  setCart,
  getCartItems,
  emptyCart as emptyCartRedux,
  removeCartItem,
  addOneAmountToCartItem,
  removeOneAmountToCartItem,
  updateOneCartItemAmount
} from "../redux/actions/carritoActions";
import { postNewItemToCart } from "../api";

function useCart() {
  const dispatch = useDispatch();
  const { isLoggedIn, id: userId } = useSelector(
    (state) => state.users.userData
  );
  const [localCarrito, setLocalCarrito] = useLocalStorageCarrito((newCart) =>
    dispatch(setCart(newCart))
  );
  const { cart } = useSelector((state) => state.carrito);

  // ----- Computed values -----
  const [totalPrice, setTotalPrice] = useState();
  const [itemsOnCart, setItemsOnCart] = useState();
  useEffect(() => {
    const thereAreItemsInTheCart = Array.isArray(cart) && cart.length;

    setTotalPrice(
      thereAreItemsInTheCart &&
        cart.reduce((acc, next) => acc + next.amount * next.price, 0)
    );

    setItemsOnCart(
      thereAreItemsInTheCart
        ? cart.reduce((acc, next) => acc + next.amount, 0)
        : null
    );
  }, [cart]);
  // ---------------------------

  function isItemOnCart(id) {
    return cart.findIndex((prod) => prod.id === id) !== -1;
  }

  function addNewItemToCart({ id, ...itemData }) {
    isLoggedIn
      ? postNewItemToCart(id, userId).then(() => dispatch(getCartItems(userId)))
      : setLocalCarrito([...localCarrito, { id, amount: 1, ...itemData }]);
  }

  function removeProduct(id) {
    isLoggedIn
      ? dispatch(removeCartItem(userId, id))
      : setLocalCarrito(localCarrito.filter((el) => el.id !== id));
  }

  function emptyCart() {
    isLoggedIn ? dispatch(emptyCartRedux(userId)) : setLocalCarrito([]);
  }

  function addOneAmountTo(id) {
    const product = cart.find((el) => el.id === id);
    if (product.amount + 1 > product.stock) return;

    if (isLoggedIn) {
      dispatch(addOneAmountToCartItem(userId, id)).then(() =>
        dispatch(getCartItems(userId))
      );
    } else {
      const prodIndex = localCarrito.findIndex(
        (prod) => prod.id === product.id
      );
      localCarrito[prodIndex].amount++;
      setLocalCarrito(localCarrito);
    }
  }

  function removeOneAmountFrom(id) {
    const product = cart.find((el) => el.id === id);
    if (isLoggedIn) {
      if (product.amount === 1) {
        dispatch(removeCartItem(userId, id)).then(() =>
          dispatch(getCartItems(userId))
        );
      } else {
        dispatch(removeOneAmountToCartItem(userId, id)).then(() =>
          dispatch(getCartItems(userId))
        );
      }
    } else {
      const prodIndex = localCarrito.findIndex(
        (prod) => prod.id === product.id
      );
      if (localCarrito[prodIndex].amount === 1) {
        setLocalCarrito(localCarrito.filter((el) => el.id !== product.id));
      } else {
        localCarrito[prodIndex].amount--;
        setLocalCarrito(localCarrito);
      }
    }
  }

  function updateAmount(id, amount) {
    const product = cart.find((el) => el.id === id);
    if (amount < 1 || amount > product.stock) return;
    if (isLoggedIn) {
      dispatch(updateOneCartItemAmount(userId, id, amount)).then(() =>
        dispatch(getCartItems(userId))
      );
    } else {
      const prodIndex = cart.findIndex((prod) => prod.id === product.id);
      localCarrito[prodIndex].amount = amount;
      setLocalCarrito(localCarrito);
    }
  }

  return {
    cart,
    isItemOnCart,
    addNewItemToCart,
    itemsOnCart,
    emptyCart,
    addOneAmountTo,
    removeOneAmountFrom,
    totalPrice,
    updateAmount,
    removeProduct
  };
}

export default useCart;
