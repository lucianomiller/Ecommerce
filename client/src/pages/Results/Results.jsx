import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import isEqual from "lodash/isEqual";
import CircularProgress from "@material-ui/core/CircularProgress";
import { searchProducts } from "../../api";
import { useLocation } from "react-router-dom";
import Catalogo from "./Catalogo/Catalogo";
import Filtros from "./Filtros/Filtros";
import Pagination from "./Pagination";

function Results() {
  const queryParams = useLocation().search;
  const [productsData, setProductsData] = useState({});
  const [paginationQueries, setPaginationQueries] = useState([]);
  const [thereAreProducts, setThereAreProducts] = useState(false);
  const [preFilteredCategories, setPrefilteredCategories] = useState(
    new URLSearchParams(queryParams).get("categories")?.split(",") || []
  );
  const { products = [], maxPriceOfAll } = productsData;

  const fetchProducts = (queryParams) =>
    searchProducts(queryParams).then(({ data }) => {
      setProductsData(data);
      const { paginationQueries: pagq = [] } = data;
      if (!isEqual(pagq, paginationQueries)) {
        setPaginationQueries(pagq);
      }
      return data;
    });

  useEffect(() => {
    setThereAreProducts(false);
    setPrefilteredCategories(
      new URLSearchParams(queryParams).get("categories")?.split(",") || []
    );
    fetchProducts(queryParams)
      .then((resp) => resp.data && setThereAreProducts(true))
      .catch((err) => {
        alert(err.response.data);
      });
  }, [queryParams]);

  return (
    <Container
      maxWidth="lg"
      style={{ display: "flex", marginTop: 50, alignItems: "flex-start" }}
    >
      <Filtros
        searchName={new URLSearchParams(queryParams).get("name")}
        maxPriceOfAllProds={maxPriceOfAll}
        filteredCategories={preFilteredCategories}
        onRequestFilter={(filters) => {
          const queryName = new URLSearchParams(queryParams).get("name");
          const filtersQuery = new URLSearchParams(filters);
          filtersQuery.get("categories")?.length === 0 &&
            filtersQuery.delete("categories");
          queryName && filtersQuery.set("name", queryName);
          fetchProducts("?" + filtersQuery.toString()).then(
            (resp) => resp.data && setThereAreProducts(true)
          );
        }}
      />
      {thereAreProducts ? (
        <div
          style={{
            width: "100%",
            alignSelf: "stretch",
            display: "grid",
            placeItems: "center"
          }}
        >
          <CircularProgress size={60} />
        </div>
      ) : products.length > 0 ? (
        <div style={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
          <Catalogo products={products} />
          <Pagination
            pagination={paginationQueries}
            onPaginationChange={(num) =>
              fetchProducts("?" + paginationQueries[num - 1])
            }
          />
        </div>
      ) : (
        <h1 style={{ width: "100%", textAlign: "center" }}>
          Producto no encontrado
        </h1>
      )}
    </Container>
  );
}
export default Results;
