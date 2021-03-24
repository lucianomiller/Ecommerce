import AssignmentIcon from "@material-ui/icons/Assignment";
import ItemsList from "./ItemsList/ItemsList";
import AllOrders from "../../components/OrderLists/AllOrders";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const useStyles = makeStyles((theme) => ({
  listClass: {
    maxHeight: 500,
    minHeight: 500,
    overflow: "auto"
  },
  loading: {
    maxHeight: 500,
    minHeight: 500,
    display: "grid",
    placeItems: "center"
  }
}));

function Ordens() {
  const { listClass, loading } = useStyles();
  const [searchFilter, setSearchFilter] = React.useState("");
  //const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { orden, isCreatingOrden } = useSelector((state) => state.ordens);

  return (
    <>
      <ItemsList
        title={<Typography variant="h5">Órdenes</Typography>}
        subtitle={orden.length + " Órdenes"}
        avatar={<AssignmentIcon fontSize="large" />}
        body={
          isCreatingOrden ? (
            <div className={loading}>
              <CircularProgress />
            </div>
          ) : orden.length > 0 ? (
            <div
              /* className={listClass} */ style={{
                maxHeight: 600,
                minHeight: 600,
                overflow: "auto"
              }}
            >
              <AllOrders fil={searchFilter} />
            </div>
          ) : (
            <Typography className={loading} variant="h5">
              No hay Órdenes
            </Typography>
          )
        }
        searchLabel={"Buscar por estado"}
        searchValue={searchFilter}
        searchOnChange={(e) => setSearchFilter(e.target.value)}
      />
    </>
  );
}

export default Ordens;
