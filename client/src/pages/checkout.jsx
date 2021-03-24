import React, { useEffect } from "react";
import { changeOrden } from "../api";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { getCartItems } from "../redux/actions/carritoActions";
import emailjs from "emailjs-com";

function Checkout() {
  const query = useLocation().search;
  const [pago, setPago] = React.useState(" ");
  useEffect(() => {
    const search = new URLSearchParams(query);
    const status = search.get("status");
    setPago(status);
  }, []);

  const { id, isLoggedIn, email } = useSelector(
    (state) => state.users.userData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && pago === "approved") {
      console.log("entra en el if");
      changeOrden(id, { estado: "completado" }).then(() => {
        dispatch(getCartItems(id));
        emailjs
          .sendForm(
            "service_zwuqrlp",
            "template_dir6b7n",
            email,
            "user_8CsKaRD5Sd30kJnwgzct1"
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log("error");
          });
      });
    }
  }, [isLoggedIn, pago]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Paper style={{ padding: 25 }}>
        <h2
          style={{
            margin: 0,
            padding: 0,
            marginBottom: 15,
            textAlign: "center",
          }}
        >
          {pago === "approved"
            ? " Su pago fue exitoso "
            : " Su pago fue rechazado "}
        </h2>
        {pago === "approved" ? (
          <Button component={Link} to="/" color="primary" variant="outlined">
            Volver a Builder
          </Button>
        ) : (
          <Button
            component={Link}
            to="/carrito"
            color="primary"
            variant="outlined"
          >
            Volver a intentar
          </Button>
        )}
      </Paper>
    </div>
  );
}

export default Checkout;
