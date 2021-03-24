import React, { useState } from "react";
import NewUserModal from "../NewUserModal/NewUserModal";
import { Button, Container, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2)
  },
  botones: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white"
    }
  }
}));

function RegisterForm() {
  const { form } = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classes = useStyles();

  let history = useHistory();

  return (
    <Container maxWidth="sm">
      <Paper elevation={2} className={form}>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Registro
        </Typography>
        <p style={{ textAlign: "center", fontSize: 20, marginTop: 20 }}>Soy</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: 50
          }}
        >
          <Button 
          className={classes.botones} 
          onClick={() => history.push("/register/empresa")}

          variant="contained">
            Empresa
          </Button>
        
          <Button
            className={classes.botones}
            onClick={() => history.push("/register/persona")}
            variant="contained"
          >
            Persona
          </Button>
        </div>
      </Paper>
    </Container>
  );
}

export default RegisterForm;
