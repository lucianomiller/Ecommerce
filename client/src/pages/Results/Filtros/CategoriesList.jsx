import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import ButtonBase from "@material-ui/core/ButtonBase";
import Collapse from "@material-ui/core/Collapse";
import { getCategories } from "../../../api";
import { makeStyles } from "@material-ui/core";
import Caret from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    padding: "5px 10px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  expandBtn: ({ isExpanded }) => ({
    transform: `rotate(${isExpanded ? "-180" : "0"}deg)`,
    transition: "transform 200ms linear"
  }),
  list: {
    minHeight: 350,
    maxHeight: 350,
    marginTop: 0,
    paddingTop: 0,
    overflow: "auto"
  }
}));

function CategoriesList({ initiallyFilteredCategories = [], onChange }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(
    initiallyFilteredCategories
  );
  const [allCategories, setAllCategories] = useState([]);
  const classes = useStyles({ isExpanded });

  const handleChange = (name) => {
    const isSelectedAlready = selectedCategories.indexOf(name) !== -1;
    let newSelectedCategories;
    if (isSelectedAlready) {
      newSelectedCategories = selectedCategories.filter((cat) => cat !== name);
    } else {
      newSelectedCategories = [...selectedCategories, name];
    }
    setSelectedCategories(newSelectedCategories);
    typeof onChange === "function" && onChange(newSelectedCategories);
  };

  useEffect(() => {
    getCategories().then((resp) => setAllCategories(resp.data));
  }, []);

  useEffect(() => {
    setSelectedCategories(initiallyFilteredCategories);
  }, [initiallyFilteredCategories]);

  return (
    <div>
      <ButtonBase
        className={classes.root}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Typography variant="h6">Categorías</Typography>
        <Caret className={classes.expandBtn} />
      </ButtonBase>

      <Collapse in={isExpanded} timeout="auto">
        <List className={classes.list}>
          {allCategories.map(({ name, id }) => {
            const isInFilteredCategories =
              selectedCategories.indexOf(name) !== -1;

            return (
              <ListItem onClick={() => handleChange(name)} key={id} button>
                <ListItemText
                  primary={name}
                  style={{ wordBreak: "break-word" }}
                />
                <ListItemSecondaryAction style={{ pointerEvents: "none" }}>
                  <Checkbox
                    edge="end"
                    color="primary"
                    checked={isInFilteredCategories}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </div>
  );
}

export default CategoriesList;
