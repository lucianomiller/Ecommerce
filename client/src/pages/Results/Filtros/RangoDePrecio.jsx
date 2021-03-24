import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

function RangoDePrecio({ onChange, minPrice = 0, maxPrice = 0 }) {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  useEffect(() => {
    setPriceRange([minPrice || 0, maxPrice || 0]);
  }, [maxPrice, minPrice]);

  const handleChange = (_, newValue) => {
    setPriceRange(newValue);
    typeof onChange === "function" && onChange(newValue);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Rango de precio
      </Typography>
      <Slider
        disabled={priceRange[0] === 0 && priceRange[1] === 0}
        value={priceRange}
        onChange={handleChange}
        min={minPrice}
        max={maxPrice}
        step={5}
      />
      <Typography>{`$${priceRange[0]} - $${priceRange[1]}`}</Typography>
    </div>
  );
}

export default RangoDePrecio;
