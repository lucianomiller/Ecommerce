import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import CardReviews from "./CardReviews";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpecificProductReviews } from "../../redux/actions/reviews";
import CardButton from "../ProductCard/CardButton";

const useStyles = makeStyles((theme) => ({
  contentRoot: { padding: 0, margin: 0 },
  categoriesWrapper: {
    maxHeight: 200,
    overflow: "auto",
    margin: "10px 0",
    "& > div": {
      marginTop: 5,
      marginRight: 5
    }
  }
}));

function ProductDetailsCard({ id, onRequestClose }) {
  const productReviews = useSelector(
    (state) => state.reviews.specificProductReviews
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const [productData, setProductData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`).then((resp) => {
      setProductData(resp.data);
    });
    dispatch(fetchSpecificProductReviews(id));
  }, [dispatch, id]);

  return (
    <Paper elevation={2} style={{ minWidth: 400, maxWidth: 450 }}>
      <Card style={{ width: 450 }}>
        <CardHeader
          action={
            onRequestClose && (
              <IconButton onClick={onRequestClose}>
                <CloseIcon />
              </IconButton>
            )
          }
          title={productData.name}
        />
        <CardMedia style={{ height: 250 }} image={productData.img} />
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Typography variant="h4">${productData.price}</Typography>
              <Typography paragraph color="textSecondary" component="p">
                {productData.stock} en stock
              </Typography>
            </div>
            <CardButton
              style={{ alignSelf: "center" }}
              size="large"
              stock={productData.stock}
              productData={productData}
            />
          </div>
          <Typography paragraph color="textPrimary" component="p">
            {productData.description}
          </Typography>
          <div className={classes.categoriesWrapper}>
            {Object.keys(productData).length > 0 &&
              productData.category.map((cat) => (
                <Chip key={cat.id} label={cat.name} clickable color="primary" />
              ))}
          </div>
        </CardContent>
        <CardReviews
          productData={productData}
          reviewsData={productReviews}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 20
          }}
        />
      </Card>
    </Paper>
  );
}

export default ProductDetailsCard;
