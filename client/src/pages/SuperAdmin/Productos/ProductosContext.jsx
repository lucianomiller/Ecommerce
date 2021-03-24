import React, { useContext, useState } from "react";
import { getCategories, getProducts } from "../../../api";
import BotonEditarCat from "./BotonEditarCat";

export const Context = React.createContext(null);

function ProductsContext({ children }) {
  const [categories, setCategories] = React.useState({});
  const [products, setProducts] = React.useState({});
  const [idsC, setIdsC] = React.useState([]);
  const [idsP, setIdsP] = React.useState([]);
  return (
    <Context.Provider
      value={{
        categories,
        products,
        idsC,
        idsP,
        getAllCategories() {
          getCategories().then((res) => {
            setCategories({
              columns: [
                { field: "name", headerName: "Nombre", width: 140 },
                {
                  field: "edit",
                  headerName: "Edit",
                  width: 160,
                  renderCell: (p) => <BotonEditarCat id={p.row.id} />,
                },
              ],
              rows: res.data,
            });
          });
        },
        getAllProducts() {
          getProducts().then((res) => {
            setProducts({
              columns: [
                { field: "id", headerName: "ID", width: 80 },
                { field: "name", headerName: "Nombre", width: 120 },
                { field: "description", headerName: "Descripción", width: 200 },
                { field: "price", headerName: "Precio", width: 100 },
                { field: "stock", headerName: "Stock", width: 100 },
              ],
              rows: res.data,
            });
          });
        },
        getIdsC(idsC) {
          setIdsC(idsC);
        },
        getIdsP(idsP) {
          setIdsP(idsP);
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ProductsContext;
