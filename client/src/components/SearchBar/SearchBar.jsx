import React, { useState } from "react";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    color: "black",
    width: "100%",
    flexGrow: 1,
    borderRadius: "10px",
    padding: theme.spacing(0.75),
  },
  input: {
    padding: 0,
    margin: 0,
  },
  container: {
    maxWidth: "80ch",
    width: "100%",
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();
  const [product, setProduct] = useState("");
  const history = useHistory();

  const submitAction = (e) => {
    e.preventDefault();
    if (!product) return;
    history.push(`/result?name=${product}`);
  };

  return (
    <form
      id="myform"
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        submitAction(e);
      }}
      className={classes.container}
    >
      <InputBase
        startAdornment={
          <SearchIcon
            style={{ cursor: "pointer", height: "100%", marginRight: 10 }}
            onClick={submitAction}
          />
        }
        placeholder="Buscar productos…"
        classes={{
          root: classes.root,
          input: classes.input,
        }}
        value={product}
        onChange={(e) => {
          setProduct(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchBar;
