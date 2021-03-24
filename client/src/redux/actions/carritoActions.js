import {
  ADDED_ITEM_TO_CART,
  ADDED_ITEM_TO_CART_ERROR,
  ADDING_ITEM_TO_CART,
  FETCHED_CART_ITEMS,
  FETCHING_CART_ITEMS,
  FETCHING_CART_ITEMS_ERROR,
  SET_CART,
  EMPTIED_CART,
  EMPTYING_CART,
  EMPTYING_CART_ERROR,
  DELETED_ITEM_FROM_CART,
  DELETING_ITEM_FROM_CART,
  DELETING_ITEM_FROM_CART_ERROR,
  REMOVED_ONE_ITEM_AMOUNT_FROM_CART,
  REMOVING_ONE_ITEM_AMOUNT_FROM_CART,
  REMOVING_ONE_ITEM_AMOUNT_FROM_CART_ERROR,
  ADDED_ONE_TO_ITEM_AMOUNT,
  ADDING_ONE_TO_ITEM_AMOUNT,
  ADDING_ONE_TO_ITEM_AMOUNT_ERROR,
  UPDATED_ONE_ITEM_AMOUNT,
  UPDATING_ONE_ITEM_AMOUNT,
  UPDATING_ONE_ITEM_AMOUNT_ERROR
} from "../constants/carrito";
import {
  postNewItemToCart,
  fetchCartItems,
  deleteCartItems,
  deleteCartItem,
  postAddOneToCartItem,
  deleteRemoveOneCartItemAmount,
  putOneCartItemAmount
} from "../../api";

// localStorage
export const setCart = (payload) => ({ type: SET_CART, payload });

export const addNewItemToCart = (userId, productId) => (dispatch) => {
  dispatch({ type: ADDING_ITEM_TO_CART });
  return postNewItemToCart(userId, productId)
    .then(() => {
      dispatch({ type: ADDED_ITEM_TO_CART, payload: productId });
    })
    .catch((e) => {
      dispatch({ type: ADDED_ITEM_TO_CART_ERROR, payload: e });
    });
};

export const getCartItems = (userId) => (dispatch) => {
  dispatch({ type: FETCHING_CART_ITEMS });
  return fetchCartItems(userId)
    .then((resp) => dispatch({ type: FETCHED_CART_ITEMS, payload: resp.data }))
    .catch((e) => dispatch({ type: FETCHING_CART_ITEMS_ERROR, payload: e }));
};

export const emptyCart = (userId) => (dispatch) => {
  dispatch({ type: EMPTYING_CART });
  return deleteCartItems(userId)
    .then(() => dispatch({ type: EMPTIED_CART }))
    .catch((e) => dispatch({ type: EMPTYING_CART_ERROR, payload: e }));
};

export const removeCartItem = (userId, productId) => (dispatch) => {
  dispatch({ type: DELETING_ITEM_FROM_CART });
  return deleteCartItem(userId, productId)
    .then(() => dispatch({ type: DELETED_ITEM_FROM_CART, payload: productId }))
    .catch((e) =>
      dispatch({ type: DELETING_ITEM_FROM_CART_ERROR, payload: e })
    );
};

export const addOneAmountToCartItem = (userId, productId) => (dispatch) => {
  dispatch({ type: ADDING_ONE_TO_ITEM_AMOUNT });
  return postAddOneToCartItem(userId, productId)
    .then(() =>
      dispatch({ type: ADDED_ONE_TO_ITEM_AMOUNT, payload: productId })
    )
    .catch((e) =>
      dispatch({ type: ADDING_ONE_TO_ITEM_AMOUNT_ERROR, payload: e })
    );
};

export const removeOneAmountToCartItem = (userId, productId) => (dispatch) => {
  dispatch({ type: REMOVING_ONE_ITEM_AMOUNT_FROM_CART });
  return deleteRemoveOneCartItemAmount(userId, productId)
    .then(() =>
      dispatch({ type: REMOVED_ONE_ITEM_AMOUNT_FROM_CART, payload: productId })
    )
    .catch((e) =>
      dispatch({ type: REMOVING_ONE_ITEM_AMOUNT_FROM_CART_ERROR, payload: e })
    );
};

export const updateOneCartItemAmount = (userId, productId, cantidad) => (
  dispatch
) => {
  dispatch({ type: UPDATING_ONE_ITEM_AMOUNT });
  return putOneCartItemAmount({ userId, cantidad, productId })
    .then(() => dispatch({ type: UPDATED_ONE_ITEM_AMOUNT, payload: productId }))
    .catch((e) =>
      dispatch({ type: UPDATING_ONE_ITEM_AMOUNT_ERROR, payload: e })
    );
};
