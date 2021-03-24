import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { FcGoogle } from "react-icons/fc";
import FacebookIcon from "@material-ui/icons/Facebook";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory, Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { Alert } from "@material-ui/lab";
import { TextField, Snackbar, Paper, InputAdornment } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import RegisterModal from "../RegisterModal/RegisterModal";
import { loginUser } from "../../redux/actions/userActions";
import LockIcon from "@material-ui/icons/Lock";
import { getCartItems } from "../../redux/actions/carritoActions";
import { mergeLocalCartWithDB } from "../../api";

import FacebookLogin from "react-facebook-login";
import { createUser } from "../../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(4),
    width: "300px",
  },
  forgotPass: {
    cursor: "pointer",
    color: theme.palette.primary.main,
    width: "100%",
    textAlign: "right",
    marginTop: 15,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(5, 7),
    alignItems: "center",
    maxWidth: "500px",
    borderRadius: "15px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1, 6),
  },
  loginWith: {
    margin: theme.spacing(1, 0, 2, 0),
    color: theme.palette.text.secondary,
    position: "relative",
    "&::after, &::before": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "100%",
      height: 1,
      background: theme.palette.text.disabled,
      content: "''",
    },
    "&::before": {
      right: "115%",
    },
    "&::after": {
      left: "115%",
    },
  },
}));

function LogInForm({ onCreate }) {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const cart = useSelector((state) => state.carrito.cart);

  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    msg: "",
  });
  const { vertical, horizontal, open } = state;
  const [formData, setFormData] = useState({
    loginField: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .then((resp) =>
        mergeLocalCartWithDB(resp.id, cart).then(() =>
          dispatch(getCartItems(resp.id))
        )
      )
      .then(() => {
        history.push("/");
      })
      .catch((e) => {
        if (e.response.data === "Debe cambiar su contraseña")
          return history.push("/resetpass");
        setState({
          open: true,
          vertical: "top",
          horizontal: "right",
          msg: e.response.data,
        });
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const responseSuccessGoogle = (response) => {
    const { givenName, familyName, googleId, email } = response.profileObj;

    dispatch(
      loginUser({
        loginField: email,
        password: googleId,
      })
    )
      .then((resp) => {
        
        mergeLocalCartWithDB(resp.id, cart)
        .then(() => dispatch(getCartItems(resp.id)))
        .then(() => {
          history.push("/");
        });
      })
      .catch((e) => {
        if (e.response.data === "User o contraseña incorrecta") {
          dispatch(
            createUser({
              firstName: givenName,
              lastName: familyName,
              userName: givenName,
              email: email,
              password: googleId,
              activate: true,
            })
          ).then((resp) => {
            dispatch(
              loginUser({
                loginField: email,
                password: googleId,
              })
            )
              .then((resp) => {
                mergeLocalCartWithDB(resp.id, cart)
                  .then(() => dispatch(getCartItems(resp.id)))
                  .then(() => {
                    history.push("/");
                  });
              })
              .catch((e) => {
                setState({
                  open: true,
                  vertical: "top",
                  horizontal: "right",
                  msg: e.response.data,
                });
              });
          });
          return;
        }
        setState({
          open: true,
          vertical: "top",
          horizontal: "right",
          msg: e.response.data,
        });
      });
   
  };

  const responseFacebook = (response) => {
    if(response.name){
    dispatch(
      loginUser({
        loginField: response.name,
        password: response.id,
      })
    )
      .then((resp) => {
        
        mergeLocalCartWithDB(resp.id, cart)
        .then(() => dispatch(getCartItems(resp.id)))
        .then(() => {
          history.push("/");
        });
      })
      .catch((e) => {
        if (e.response.data === "User o contraseña incorrecta") {
          dispatch(
            createUser({
              firstName: response.name.split(" ")[0],
              lastName: response.name.split(" ")[1],
              userName: response.name,
              email: response.email,
              password: response.id,
              activate: true,
            })
          ).then((resp) => {
            dispatch(
              loginUser({
                loginField: response.name,
                password: response.id,
              })
            )
              .then((resp) => {
                mergeLocalCartWithDB(resp.id, cart)
                  .then(() => dispatch(getCartItems(resp.id)))
                  .then(() => {
                    history.push("/");
                  });
              })
              .catch((e) => {
                setState({
                  open: true,
                  vertical: "top",
                  horizontal: "right",
                  msg: e.response.data,
                });
              });
          });
          return;
        }
        setState({
          open: true,
          vertical: "top",
          horizontal: "right",
          msg: e.response.data,
        });
      });
  
}};
  return (
    <Paper
      elevation={2}
      component="form"
      className={classes.form}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" style={{ fontWeight: "bold" }}>
        Iniciar Sesión
      </Typography>

      <TextField
        className={classes.margin}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircleIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
        label="Username or Email"
        name="loginField"
        value={formData.loginField}
        autoFocus
      />
      <TextField
        className={classes.margin}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
        name="password"
        label="Contraseña"
        type="password"
        value={formData.password}
        id="password"
      />

      <Link to="/forget_password" className={classes.forgotPass}>
        Olvidaste tu contraseña?
      </Link>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        className={classes.submit}
      >
        Iniciar Sesión
      </Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {state.msg}
        </Alert>
      </Snackbar>

      <Typography variant="caption" className={classes.loginWith}>
        Iniciar sesion con
      </Typography>
      <div style={{ display: "flex" }}>
        <Paper
          title="Sign in with Google"
          elevation={4}
          style={{
            marginRight: 15,
            display: "grid",
            borderRadius: 5,
            placeItems: "center",
          }}
        >
          <GoogleLogin
            clientId="1092355223425-8dsi29tie144eofnada1gv1c4n7lufrl.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseSuccessGoogle}
            onFailure={"error"}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <FcGoogle
                size={50}
                onClick={renderProps.onClick}
                style={{ cursor: "pointer", padding: 8 }}
              />
            )}
          />
        </Paper>
        <Paper
          elevation={4}
          style={{
            marginRight: 15,
            display: "grid",
            borderRadius: 5,
            placeItems: "center",
          }}
        >
          <FacebookLogin
            title="Sign in with Facebook"
            appId="754494988838114"
            autoLoad={false}
            fields="name,email,picture"
            //onClick={componentClicked}
            callback={responseFacebook}
            buttonStyle={{
              background: "none",
              padding: 0,
              margin: 0,
              border: "none",
            }}
            icon={
              <FacebookIcon
                style={{ color: "#4267B2", height: 50, width: 50, padding: 4 }}
              />
            }
            textButton=""
            size="small"
          />
        </Paper>
      </div>
      <Typography
        onClick={() => setIsRegisterModalOpen(true)}
        variant="subtitle1"
        color="primary"
        style={{
          cursor: "pointer",
          marginTop: 16,
        }}
      >
        Registrate gratis
      </Typography>
      <RegisterModal
        isModalOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </Paper>
  );
}

export default LogInForm;
