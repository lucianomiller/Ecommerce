import {
  SET_CART,
  ADDING_ITEM_TO_CART,
  ADDED_ITEM_TO_CART,
  ADDED_ITEM_TO_CART_ERROR,
  FETCHED_CART_ITEMS,
  FETCHING_CART_ITEMS,
  FETCHING_CART_ITEMS_ERROR,
  EMPTIED_CART,
  EMPTYING_CART,
  EMPTYING_CART_ERROR,
  DELETED_ITEM_FROM_CART,
  DELETING_ITEM_FROM_CART,
  DELETING_ITEM_FROM_CART_ERROR,
  ADDED_ONE_TO_ITEM_AMOUNT,
  ADDING_ONE_TO_ITEM_AMOUNT,
  ADDING_ONE_TO_ITEM_AMOUNT_ERROR,
  REMOVING_ONE_ITEM_AMOUNT_FROM_CART,
  REMOVED_ONE_ITEM_AMOUNT_FROM_CART,
  REMOVING_ONE_ITEM_AMOUNT_FROM_CART_ERROR,
  UPDATED_ONE_ITEM_AMOUNT,
  UPDATING_ONE_ITEM_AMOUNT,
  UPDATING_ONE_ITEM_AMOUNT_ERROR
} from "../constants/carrito";
const initialState = {
  cart: [],
  isAddingItemToCart: false,
  isAddingItemToCartError: null,
  isFetchingCartItems: false,
  isFetchingCartItemsError: null,
  emptyingCart: false,
  emptyingCartError: null,
  isDeletingItem: false,
  isDeletingItemError: null,
  addingOneToItemAmount: false,
  addingOneToItemAmountError: null,
  isRemovingOneItemAmount: false,
  isRemovingOneItemAmountError: null,
  updatingOneItemAmount: false,
  updatingOneItemAmountError: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload };
    case ADDING_ITEM_TO_CART:
      return {
        ...state,
        isAddingItemToCart: true,
        isAddingItemToCartError: null
      };
    case ADDED_ITEM_TO_CART:
      return {
        ...state,
        isAddingItemToCart: false,
        isAddingItemToCartError: null
      };
    case ADDED_ITEM_TO_CART_ERROR:
      return {
        ...state,
        isAddingItemToCart: false,
        isAddingItemToCartError: action.payload
      };
    case FETCHING_CART_ITEMS:
      return {
        ...state,
        isFetchingCartItems: true,
        isFetchingCartItemsError: null
      };
    case FETCHED_CART_ITEMS:
      return {
        ...state,
        cart: action.payload,
        isFetchingCartItems: false,
        isFetchingCartItemsError: null
      };
    case FETCHING_CART_ITEMS_ERROR:
      return {
        ...state,
        isFetchingCartItems: false,
        isFetchingCartItemsError: action.payload
      };
    case EMPTYING_CART:
      return {
        ...state,
        emptyingCart: true,
        emptyingCartError: null
      };
    case EMPTIED_CART:
      return {
        ...state,
        cart: [],
        emptyingCart: false,
        emptyingCartError: null
      };
    case EMPTYING_CART_ERROR:
      return {
        ...state,
        emptyingCart: false,
        emptyingCartError: action.payload
      };
    case DELETING_ITEM_FROM_CART:
      return {
        ...state,
        isDeletingItem: false,
        isDeletingItemError: null
      };
    case DELETED_ITEM_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((prod) => prod.id !== action.payload),
        isDeletingItem: false,
        isDeletingItemError: null
      };
    case DELETING_ITEM_FROM_CART_ERROR:
      return {
        ...state,
        isDeletingItem: false,
        isDeletingItemError: action.payload
      };
    case ADDING_ONE_TO_ITEM_AMOUNT:
      return {
        ...state,
        addingOneToItemAmount: true,
        addingOneToItemAmountError: null
      };
    case ADDED_ONE_TO_ITEM_AMOUNT:
      return {
        ...state,
        addingOneToItemAmount: false,
        addingOneToItemAmountError: null
      };
    case ADDING_ONE_TO_ITEM_AMOUNT_ERROR:
      return {
        ...state,
        addingOneToItemAmount: false,
        addingOneToItemAmountError: action.payload
      };

    case REMOVING_ONE_ITEM_AMOUNT_FROM_CART:
      return {
        ...state,
        isRemovingOneItemAmount: true,
        isRemovingOneItemAmountError: null
      };
    case REMOVED_ONE_ITEM_AMOUNT_FROM_CART:
      return {
        ...state,
        isRemovingOneItemAmount: false,
        isRemovingOneItemAmountError: null
      };
    case REMOVING_ONE_ITEM_AMOUNT_FROM_CART_ERROR:
      return {
        ...state,
        isRemovingOneItemAmount: true,
        isRemovingOneItemAmountError: action.payload
      };
    case UPDATING_ONE_ITEM_AMOUNT:
      return {
        ...state,
        updatingOneItemAmount: true,
        updatingOneItemAmountError: null
      };
    case UPDATED_ONE_ITEM_AMOUNT:
      return {
        ...state,
        updatingOneItemAmount: false,
        updatingOneItemAmountError: null
      };
    case UPDATING_ONE_ITEM_AMOUNT_ERROR:
      return {
        ...state,
        updatingOneItemAmount: false,
        updatingOneItemAmountError: action.payload
      };

    default:
      return state;
  }
}

export default reducer;
