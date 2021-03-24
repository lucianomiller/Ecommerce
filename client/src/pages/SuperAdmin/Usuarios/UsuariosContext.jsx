import React, { useContext, useState } from "react";
import { getUsers } from "../../../api";

export const Context = React.createContext(null);

function UsuariosContext({ children }) {
  const [users, setUsers] = React.useState({});
  const [ids, setIds] = React.useState([]);
  return (
    <Context.Provider
      value={{
        users,
        ids,
        getAllUsers() {
          getUsers().then((res) => {
            setUsers({
              columns: [
                // { field: "id", headerName: "ID", width: 70 },
                { field: "firstName", headerName: "Nombre", width: 120 },
                { field: "lastName", headerName: "Apellido", width: 120 },
                // { field: "cuit", headerName: "Cuit", width: 120 },
                { field: "userName", headerName: "Username", width: 120 },
                { field: "email", headerName: "Email", width: 200 },
                { field: "role", headerName: "Rol", width: 90 },
                { field: "banned", headerName: "Baneado", width: 120 },
                { field: "activate", headerName: "Activate", width: 120 },
                {
                  field: "changePass",
                  headerName: "ChangePass",
                  width: 150,
                },
              ],
              rows: res.data,
            });
          });
        },
        getIds(idsUsers) {
          setIds(idsUsers);
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default UsuariosContext;
