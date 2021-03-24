import React, { useState } from "react";

import { useDispatch } from "react-redux";


import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { fetchUserData } from "../../redux/actions/userActions";
import { fetchUsers, deleteUser } from "../../redux/actions/userActions";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import axios from "axios";


import Modal from "@material-ui/core/Modal";
import { TextField, Button, Container } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { useHistory, Link } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";



const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(6)
      },
      modal:{
        //position: 'absolute',
        width: "50%",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(0, 0, 0),
      }
  }));



function Profile() {
    const dispatch = useDispatch();   
       
    React.useState(() => {
        dispatch(fetchUserData());   
        dispatch(fetchUsers())
    },[]);

    const { userData, users } = useSelector((state) => state.users);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    
    console.log(userData);
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }  
    const { form,modal } = useStyles();

    const [userDatos, setUserDatos] = useState({    
        userName: "",
        email:"",
        firstName:"",
        lastName:""

    });
    let history = useHistory();

    const handleaOnChange = (e) => {
        const { value, name } = e.target;
        setUserDatos({ ...userDatos, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData.id)
        axios.put(`http://localhost:3001/user/${userData.id}`,userDatos)
        .then (()=>dispatch(fetchUsers()));
        setIsEditModalOpen(false)
    
    };
    const handleDeleteUser=()=>{
        axios.delete(`http://localhost:3001/user/${userData.id}`)
        .then(()=>history.push("/login"))
    }

    return (
      
      
    <div 
        style={{
            padding: 40,
            display: "grid",        
            gridTemplateColumns: "repeat(center, minmax(400px, 1fr)",        
            placeItems: "center"        
        }}
     >
        {
            users.length >0 ? (
                
                users.map((us) => {
                    if (us.id===userData.id)
                return(
                
            <Card elevation={24} style={{ minWidth: "300px",padding:25, /* maxWidth:"80%", */width:"40%"}}>
                <CardHeader elevation={24}
                title={
                    <Typography color="primary" style={{ padding: 10,color:"white",
                    backgroundColor:"#E49012",borderRadius:3, display: "grid",
                
                    placeItems: "center",
                    overflow: "auto" }} variant="h4" >
                    Mis Datos
                    </Typography>
                }
                />

                <CardContent style={{
                display: "grid",
                
                placeItems: "center",
                overflow: "auto"
                }}>
                
                <List component="nav" aria-label="main mailbox folders" style={{ padding: 20, }}>

                    <Typography style={{ padding: 3, }} variant="h5">
                        Datos de cuenta
                    </Typography>
                    <Divider />
                    <ListItem  >
                
                <ListItemText primary={"Usuario: "+  us.userName } />              
                </ListItem>                
                <Divider />
                <ListItem >                
                <ListItemText primary={"Email: "+ us.email } />                
                </ListItem>
            {/* </List> */}            
            <Divider variant="fullWidth"  style={{ marginBottom: 20 }} />            
            
                {/* <List component="nav" aria-label="main mailbox folders" style={{ padding: 20 }}> */}
                <Typography style={{ padding: 3, }} variant="h5">
                    Datos personales
                    </Typography>
                    <Divider />
                <ListItem >
                
                    <ListItemText primary={"Nombre: "+ capitalizeFirstLetter(us.firstName) } />
                
                </ListItem>
                <Divider />
                <ListItem style={{ marginBottom: 20 }}>
                
                <ListItemText primary={"Apellido: " + capitalizeFirstLetter(us.lastName) }/>
                
                </ListItem>
            </List >
            <Grid container justify="center" spacing={2}>
            <Grid  item>
            <Button
                elevation={2}
                color="primary"                
                variant="contained"
                type="submit"
                onClick={() => setIsEditModalOpen(true)} 
                >
                Editar mis datos
                </Button>
                </Grid>
                <Grid  item>
                <Button
                 elevation={2}
                color="primary"                
                variant="contained"
                type="submit"
                onClick={() => history.push("/resetpass")} 
                >
                Cambiar contraseña
                </Button>
                </Grid>
                <Grid  item>
                <Button
                style={{background:"#b71c1c"}}
                elevation={2}
                color="primary"                
                variant="contained"
                type="submit"
                onClick={() => setIsDeleteModalOpen(true)} 
                >
                Eliminar mi cuenta
                </Button>
                </Grid>
                </Grid>


                         
            </CardContent>
                <ConfirmationModal
                    isModalOpen={isDeleteModalOpen}
                    onRequestClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => handleDeleteUser()}
                    title={`Estas seguro de que quieres eliminar la cuenta de "${us.userName}"?`}
                 />
            <Modal
                style={{
                display: "grid",
                placeItems: "center",
                overflow: "auto",
                
                }}
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            >
                <Container className={modal} maxWidth="sm">
            <Paper
                elevation={2}
                component="form"
                className={form}
                onSubmit={handleSubmit}
            >
                <h1 align="center">Editar mis datos</h1>
                <TextField
                label="Usuario"
                required
                onChange={handleaOnChange}
                name="userName"
                value={userDatos.userName}
                
                /> 
                <TextField
                label="Email"
                required
                onChange={handleaOnChange}
                name="email"
                value={userDatos.email}
                
                />
                <TextField
                label="Nombre"
                required
                onChange={handleaOnChange}
                name="firstName"
                value={userDatos.firstName}
                
                />

                <TextField
                label="Apellido"
                required
                onChange={handleaOnChange}
                name="lastName"
                value={userDatos.lastName}
                style={{ marginBottom: 30 }}
                />
                
                <Button
                color="primary"          
                variant="contained"
                type="submit"
                >
                Editar mis datos
                </Button>
                
            </Paper>
            </Container>
            </Modal>   
            </Card>
                    
            )}
            )            
                    
            ) : (
                <Typography  variant="h5" /* className={classes.loading } */ align="center">
                    Usuario no encontrado
                </Typography>
            )
                
        }
    </div>     
    
  );
}

export default Profile;