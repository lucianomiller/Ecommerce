import {
  CREATED_ORDEN,
  CREATING_ORDEN,
  CREATING_ORDEN_ERROR,
  FETCHED_ORDEN,
  FETCHING_ORDEN,
  FETCHING_ORDEN_ERROR
} from "../constants/orden";

const initialState = {
  orden: [],
  isCreatingOrden: false,
  isCreatingOrdenError: null,
  isFetchingOrdens: false,
  isFetchingOrdensError: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATING_ORDEN:
      return {
        ...state,
        isCreatingOrden: true,
        isCreatingOrdenError: null
      };
    case CREATED_ORDEN:
      return {
        ...state,
        isCreatingOrden: false,
        isCreatingOrdenError: null
      };
    case CREATING_ORDEN_ERROR:
      return {
        ...state,
        isCreatingOrden: false,
        isCreatingOrdenError: action.payload
      };
    case FETCHING_ORDEN:
      return {
        ...state,
        isFetchingOrden: true,
        isFetchingOrdenError: null
      };
    case FETCHED_ORDEN:
      return {
        ...state,
        orden: action.payload,
        isFetchingOrden: false,
        isFetchingOrdenError: null
      };
    case FETCHING_ORDEN_ERROR:
      return {
        ...state,
        isFetchingOrden: false,
        isFetchingOrdenError: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
