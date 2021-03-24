import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useLocation } from "react-router-dom";
import {Modal, Typography} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    modalactivate:{
        color: theme.palette.text.primary,
        display: "grid",
        placeItems: "center",
        overflow: "auto",
        backgroundColor: theme.palette.background.default,

    }
}))



function useQuery(){
    return new URLSearchParams(useLocation().search)
}

function ActivateAccount() {
    let query = useQuery()
    const classes = useStyles();


    var email = query.get('email')

    useEffect(() =>{
        axios.put(`http://localhost:3001/user/activate?email=${email}`,{
            activate: true
        })
        setIsModalOpen(true)
    })
    let history = useHistory();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClose = () => {
        setIsModalOpen(false);
        history.push("/login")      

      };

    return (
        <Modal
        className={classes.modalactivate}
      style={{
          
        // display: "grid",
        // placeItems: "center",
        // overflow: "auto",
        // backgroundColor: "#E49012"
      }}
       open={isModalOpen}
       onClose={handleClose}
    >
        <Typography variant='h2' >
            BIENVENIDO A BUILDER, TU CUENTA ESTA ACTIVADA
        </Typography>
    </Modal>
    )
}

export default ActivateAccount
