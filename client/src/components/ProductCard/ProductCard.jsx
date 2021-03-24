import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import CardButton from "./CardButton";
import CardReviews from "./CardReviews";

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
    alignItems: "center",
    borderRadius: "10px",
    boxShadow: theme.shadows[2],
    "&:hover": {
      boxShadow: theme.shadows[3],
    },
    // "&:hover $boton":{
    //   display:'block',
    //   backgroundColor:'red'
    // }
  },
  title: {
    textTransform: "capitalize",
  },
  cardContent: {
    margin: 0,
    padding: 0,
    "&:last-child": {
      padding: 0,
    },
    "& > div": {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2),
      justifyContent: "space-between",
    },
    "& div:first-child": {
      paddingBottom: 0,
    },
  },
  media: {
    display: "block",
    // marginLeft: "auto",
    // marginRight: "auto",
    width: "100%",
    paddingTop: "60.25%",
    //paddingTop: "56.25%", // 16:9
    // padding: "10px"
  },
  action: { flex: "none", alignSelf: "center", margin: 0 },
}));

function ProductCard({ product, productReviews }) {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <Modal
        style={{
          display: "grid",
          placeItems: "center",
          overflow: "auto",
        }}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ProductDetailsCard
          onRequestClose={() => setIsModalOpen(false)}
          id={product.id}
        />
      </Modal>
      <Card className={classes.root}>
        <CardHeader
          classes={{ action: classes.action }}
          onClick={() => setIsModalOpen(true)}
          className={classes.title}
          title={product.name}
          subheader="Buenos Aires, Argentina."
        />
        <CardMedia
          onClick={() => setIsModalOpen(true)}
          className={classes.media}
          image={product.img}
          title={product.name}
        />
        <CardContent
          onClick={() => setIsModalOpen(true)}
          className={classes.cardContent}
        >
          <div>
            <Typography variant="h5">${product.price}</Typography>
            <CardButton stock={product.stock} productData={product} />
          </div>
          <CardReviews reviewsData={productReviews} />
        </CardContent>
      </Card>
    </>
  );
}

export default ProductCard;
