import {
  FETCHED_ORDEN,
  FETCHING_ORDEN,
  FETCHING_ORDEN_ERROR
} from "../constants/orden";
import { getOrden } from "../../api";

export const fetchOrden = () => (dispatch) => {
  dispatch({ type: FETCHING_ORDEN });
  getOrden()
    .then((resp) => {
      dispatch({ type: FETCHED_ORDEN, payload: resp.data });
    })
    .catch((e) => {
      dispatch({ type: FETCHING_ORDEN_ERROR, payload: e });
    });
};

/* export const modifyUser = (data) => (dispatch) =>{
  
    
  } */
