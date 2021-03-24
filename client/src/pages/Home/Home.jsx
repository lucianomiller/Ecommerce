import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Slider from "../../components/Slider/Slider";
import { getNewestProducts } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { getMostRecentlyCreatedProductsReviews } from "../../redux/actions/productsActions";
import Spinner from "./Spinner";
import ProductCard from "../../components/ProductCard/ProductCard";

const Home = () => {
  const [isFetchingProducts, setisFetchingProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const { latestProductsReviews } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.title = "Builder";
    dispatch(getMostRecentlyCreatedProductsReviews());
    getNewestProducts(12).then(({ data }) => {
      setisFetchingProducts(false);
      setProducts(data);
    });
  }, []);

  return (
    <Container maxWidth="lg">
      <Slider />

      {isFetchingProducts ? (
        <Spinner />
      ) : (
        <div
          style={{
            display: "grid",
            margin: "30px 0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            alignItems: " flex-start",
            gap: "30px"
          }}
        >
          {products.map((prod, i) => (
            <ProductCard
              key={i}
              product={prod}
              productReviews={latestProductsReviews.find((revs) =>
                revs.some((rev) => rev.productId === prod.id)
              )}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Home;
