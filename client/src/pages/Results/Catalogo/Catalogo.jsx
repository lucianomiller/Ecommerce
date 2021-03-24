import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { fetchAllReviews } from "../../../redux/actions/reviews";

export default function Catalog({ products }) {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.reviews.allReviews);

  React.useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  return (
    <div
      style={{
        padding: "30px",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        alignItems: " flex-start",
        gap: " 30px"
      }}
    >
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          productReviews={allReviews.filter(
            (prod) => prod.productId === product.id
          )}
          style={{ margin: "30px" }}
        />
      ))}
    </div>
  );
}
