import React from "react";
import CategoriesList from "./Categories";
import ProductsList from "./Products";
import Ordenes from "./Ordenes";
import UserList from "./Users";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/productsActions";
import { fetchCategories } from "../../redux/actions/categoryActions";
import { fetchUsers } from "../../redux/actions/userActions";
import { fetchOrden } from "../../redux/actions/ordenActions";

function Dashboard() {
  const dispatch = useDispatch();
  const { role, isLoggedIn } = useSelector((state) => state.users.userData);

  React.useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchUsers());
    dispatch(fetchOrden());
  }, []);

  return (
    <>
      <div
        style={{
          padding: 25,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr)",
          alignItems: "flex-start",
          gap: 50,
          minHeight: "70%",
          flexWrap: "wrap",
        }}
      >
        {/* {JSON.stringify(role)} */}
        {/* <CategoriesList /> */}
        {/* <Ordenes /> */}
        <ProductsList />
        {/* <UserList /> */}
      </div>
    </>
  );
}

export default Dashboard;
