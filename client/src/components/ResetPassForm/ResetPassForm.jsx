import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Container,
  Paper,
  InputAdornment,
  FormHelperText,
  Button,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import { useDispatch } from "react-redux";
import { resetUserPass } from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(4),
    width: "300px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    alignItems: "center",
    width: "auto",
    height: "auto",
    borderRadius: "15px",
    marginTop: "90px",
  },
}));

function ResetPassForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState({
    //email:'',
    userName: "",
    oldPassword: "",
    newPassword: "",
  });
  const [findUserName, setFindUserName] = useState("");
  const [findUserPass, setFindUserPass] = useState("");

  const [errorInput, setErrorInput] = useState({
    newPassword: "",
    userName: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:3001/user/username?q=${data.userName}`)
      .then((resp) => {
     //   console.log(resp.data)
        if (resp.data.userName) {
          setData({
            ...data,
            userName: resp.data.userName,
         //   oldPassword: resp.data.password,
          });
        //  console.log(data)
          setFindUserName(data.userName);
        } else {
          setErrorInput({ userName: resp.data.msg });
        }
      })
      .catch((err) => {
       // console.log(err);
      });

    if (data.oldPassword === data.newPassword)
      return setErrorInput({
        newPassword: "Las contraseña deben ser diferentes",
      });
    else {
      dispatch(resetUserPass(data));
      history.push("/login");
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <Container
      maxWidth="sm"
      style={{
        position: "absolute",
        top: "137px",
        left: "590px",
        width: "640px",
        height: "750px",
      }}
    >
      <Paper
        elevation={2}
        component="form"
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <TextField
          className={classes.margin}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          label="Username"
          name="userName"
          value={data.userName}
          autoFocus
        />
        {data.userName === "" ? (
          <div></div>
        ) : (
          <>
            {data.userName === findUserName ? (
              <>
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
                  name="oldPassword"
                  label="Old Password"
                  type="password"
                  value={data.password}
                  id="oldPassword"
                  // autoComplete="current-password"
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
                  name="newPassword"
                  label="New Password"
                  type="password"
                  value={data.newPassword}
                  id="newPassword"
                  helperText={errorInput.newPassword}
                />
                {/* <FormHelperText style={{ color: "red", textAlign:'center' }}>
                  {errorInput.newPassword}
                </FormHelperText> */}
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.submit}
                >
                  Cambiar Password
                </Button>
              </>
            ) : (
              <h1>{errorInput.userName}</h1>
            )}
          </>
        )}

       
      </Paper>
    </Container>
  );
}

export default ResetPassForm;
