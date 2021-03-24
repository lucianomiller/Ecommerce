import React from "react";
import Navbar from "./Navbar";
import { Route } from "react-router-dom";
import Productos from "./Productos/Productos";
import Usuarios from "./Usuarios/Usuarios";

function SuperAdmin() {
  return (
    <div>
      <Navbar />
      {/* <Route exact path="/admin/usuarios" component={Usuarios} />
      <Route exact path="/admin/productos" component={Productos} /> */}
    </div>
  );
}

export default SuperAdmin;
