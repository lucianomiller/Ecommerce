import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/actions/userActions";
//import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import emailjs from 'emailjs-com';

import {
  TextField,
  FormHelperText,
  Snackbar,
  Button,
  Container,
  Paper
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    width: 500,
    maxWidth: 500,
    padding: theme.spacing(4)
  }
}));

function UserForm({ onCreate }) {
  let history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    msg: "",
  });
  const { vertical, horizontal, open } = state;
  // const { isCreatingUser, isCreatingUserError } = useSelector(
  //   (state) => state.users
  // );
  const [errorInput, setErrorInput] = useState({
    firstname: "",
    lastname: ""
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",

    password: ""
  });

  const { form } = useStyles();

  

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    var emailData = e.target
    dispatch(createUser(formData))
      .then(() => {
        emailjs.sendForm('service_zwuqrlp','template_ncq7s1v', emailData, 'user_8CsKaRD5Sd30kJnwgzct1')
        .then(res =>{
          
          setState({
            open: true,
            vertical: "top",
            horizontal: "right",
            msg: 'check you email ',
          });
          history.push("/user/confirmation")      
        })
        .catch(err =>{
        })  
        
      })
      .catch((error) => {
        
        setState({
          open: true,
          vertical: "top",
          horizontal: "right",
          msg: error.response.data,
        });
      })
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    var regEx = /[^a-zA-Z\s]/gi;

    if (name === "firstName" && regEx.test(value)) {
      setErrorInput({
        ...errorInput,
        firstname: "El nombre no debe incluir numeros"
      });
    } else if (name === "lastName" && regEx.test(value)) {
      setErrorInput({
        ...errorInput,
        lastname: "El apellido no debe incluir numeros"
      });
    } else {
      setErrorInput("");
    }
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container
      style={{
        height: "100%",
        width: "100%",
        display: "grid",
        placeItems: "center"
      }}
    >
      <Paper
        elevation={2}
        component="form"
        className={form}
        onSubmit={handleSubmit}
      >
        <h1 style={{ textAlign: "center" }}>Completa tus datos</h1>

        <TextField
          label="Nombre"
          required
          onChange={handleChange}
          name="firstName"
          value={formData.firstName}
          style={{ marginBottom: 16 }}
          inputProps={{
            pattern: "[a-zA-Z]{1,15}"
          }}
        />
        <FormHelperText style={{ color: "red" }}>
          {errorInput.firstname}
        </FormHelperText>
        <TextField
          label="Apellido"
          required
          autoComplete={false}
          onChange={handleChange}
          name="lastName"
          value={formData.lastName}
          style={{ marginBottom: 16 }}
          inputProps={{
            pattern: "[a-zA-Z]{1,15}"
          }}
        />
        <FormHelperText style={{ color: "red" }}>
          {errorInput.lastname}
        </FormHelperText>

        <TextField
          label="User Name"
          required
          autoComplete={false}
          onChange={handleChange}
          name="userName"
          inputProps={{
            maxLength: 25,
            typeof: "string"
          }}
          value={formData.userName}
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="Email"
          autoComplete={false}
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={formData.email}
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={formData.password}
          style={{ marginBottom: 16 }}
        />
        <Button
          style={{ backgroundColor: "#E49012", color: "white" }}
          variant="contained"
          type="submit"
        >
          Crear Cuenta
        </Button>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {state.msg}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}

export default UserForm;
