import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Carrito from "./pages/Carrito/Carrito";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Contacto from "./pages/Home/Contacto";
import Results from "./pages/Results/Results";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewProduct from "./pages/NewProduct/NewProduct";
import History from "./pages/History/History";
import Profile from "./pages/Profile/Profile";
import RegisterPersona from "./pages/Register/RegisterPersona";
import RegisterEmpresa from "./pages/Register/RegisterEmpresa";
import Login from "./pages/Login/Login";
import { useDispatch } from "react-redux";
import { fetchUserData } from "./redux/actions/userActions";
import { makeStyles } from "@material-ui/core";
import { getCartItems } from "./redux/actions/carritoActions";
import ResetUserPass from "./pages/ResetUserPass/ResetUserPass";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { setCart } from "./redux/actions/carritoActions";
import SuperAdmin from "./pages/SuperAdmin/SuperAdmin";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import useLocalStorageCarrito from "./hooks/useLocalStorageCarrito.js";
import checkout from "./pages/checkout";
import ActivateAccount from "./pages/ActivateAccount/ActivateAccount";
import EmailConfirmation from "./pages/ActivateAccount/EmailConfirmation";

const useStyles = makeStyles((theme) => ({
  app: {
    background: theme.palette.background.default,
    overflow: "auto",
  },
}));

export const App = () => {
  const { app } = useStyles();
  const [carrito] = useLocalStorageCarrito();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCart(carrito));
    dispatch(fetchUserData()).then((userData) => {
      // if logged in
      if (userData) {
        localStorage.removeItem("carrito");
        dispatch(getCartItems(userData.id));
      }
    });
  }, []);

  return (
    <>
      <div className={`App ${app}`}>
        <Switch>
          <Route path="/checkout" component={checkout} />
          <Route path="/admin" component={SuperAdmin} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/resetpass" component={ResetUserPass} />
          <Route exact path="/register/persona" component={RegisterPersona} />
          <Route exact path="/register/empresa" component={RegisterEmpresa} />
          <Route exact path="/user/activate" component={ActivateAccount} />
          <Route
            exact
            path="/user/confirmation"
            component={EmailConfirmation}
          />

          <Route exact path="/forgetPassword" component={ForgetPassword} />
          <Route path="/">
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/contacto" component={Contacto} />
            <Route exact path="/result" component={Results} />
            <Route exact path="/addProduct" component={NewProduct} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/history" component={History} />
            <Route exact path="/carrito" component={Carrito} />
          </Route>
        </Switch>
      </div>
    </>
  );
};

// export default App;
