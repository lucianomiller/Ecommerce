import React from "react";
import ProductForm from "../../components/ProductForm/ProductForm";

function NewProduct() {
  return (
    <div
      style={{
        padding: "25px 0",
        display: "grid",
        placeItems: "center",
        minHeight: "100%"
      }}
    >
      <ProductForm />
    </div>
  );
}

export default NewProduct;
