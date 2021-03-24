import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useLocation } from "react-router-dom";
import {Modal, Typography} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    modalconfirm:{
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

function EmailConfirmation() {
    const classes = useStyles();

   
    useEffect(() =>{
      
        setIsModalOpen(true)
    })
    let history = useHistory();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClose = () => {
        setIsModalOpen(false);
        history.push("/")      

      };

    return (
        <Modal
        className={classes.modalconfirm}
    //   style={{
    //     display: "grid",
    //     placeItems: "center",
    //     overflow: "auto",
    //     backgroundColor: "#E49012"
    //   }}
       open={isModalOpen}
       onClose={handleClose}
    >
        <Typography variant='h2' >
            REVISA TU CORREO
        </Typography>
    </Modal>
    )
}

export default EmailConfirmation
