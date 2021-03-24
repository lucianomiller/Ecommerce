import React from "react";
import MyOrders from "../../components/OrderLists/MyOrders";
import { useSelector, useDispatch } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Spinner from "../Home/Spinner";


function History() {
  const { orden } = useSelector((state) => state.ordens);
  const { isLoggedIn } = useSelector((state) => state.users.userData);


  return (
    <>
    {!orden ? (
      <>
       <div>
        
        <Spinner />
      </div>
      </>
    ) :(
      <>

    <div
      style={{
        padding: 25,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr)",
        alignItems: "flex-start",
        gap: 50,
        minHeight: "70%",
        flexWrap: "wrap"
      }}
    >
      
      <Card>
        <CardHeader
          title={
            <Typography style={{ padding: 3 }} variant="h5">
              Historial de compras
            </Typography>
          }
        />

        <CardContent>
          <MyOrders />
        </CardContent>
      </Card>
    </div>
      </>
    )}
    </>
  );
}

export default History;
