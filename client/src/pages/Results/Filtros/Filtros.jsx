import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import RangoDePrecio from "./RangoDePrecio";
import CategoriesList from "./CategoriesList";
import Hidden from "@material-ui/core/Hidden";

function Filtros({
  maxPriceOfAllProds,
  onRequestFilter,
  filteredCategories,
  searchName
}) {
  const [filtersData, setFiltersData] = useState({
    min: 0,
    categories: filteredCategories
  });

  return (
    <Hidden only="xs">
      <Paper
        elevation={1}
        style={{ padding: 25, minWidth: 275, maxWidth: 275 }}
      >
        <div>
          {searchName && (
            <Typography
              variant="h6"
              style={{ fontStyle: "italic", marginBottom: 15 }}
            >
              "{searchName}"
            </Typography>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15
            }}
          >
            <Typography variant="h5">Filtros</Typography>
            <Button
              onClick={() => {
                onRequestFilter && onRequestFilter(filtersData);
              }}
              color="primary"
              variant="outlined"
            >
              Filtrar
            </Button>
          </div>
        </div>
        <Divider style={{ marginBottom: 25 }} />
        <RangoDePrecio
          maxPrice={maxPriceOfAllProds}
          onChange={(range) =>
            setFiltersData({
              ...filtersData,
              min: range[0],
              max: range[1]
            })
          }
        />
        <CategoriesList
          initiallyFilteredCategories={filteredCategories}
          onChange={(selectedCategories) => {
            setFiltersData({ ...filtersData, categories: selectedCategories });
          }}
        />
      </Paper>
    </Hidden>
  );
}

export default Filtros;
