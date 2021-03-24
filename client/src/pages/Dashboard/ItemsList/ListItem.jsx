import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  nested: {
    display: "block",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    background: theme.palette.background.default,
    margin: 0
  }
}));

function MyListItem({ primary, nestedText, secondary, buttons }) {
  const [open, setOpen] = React.useState(false);
  const { nested } = useStyles();
  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemText
          style={{
            wordBreak: "break-all",
            whiteSpace: "normal"
          }}
          primary={primary}
          secondary={secondary}
        />
        {React.Children.count(buttons) > 0 && (
          <ListItemSecondaryAction>{buttons}</ListItemSecondaryAction>
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Typography className={nested} variant="paragraph">
          {nestedText}
        </Typography>
      </Collapse>
    </>
  );
}

export default MyListItem;
