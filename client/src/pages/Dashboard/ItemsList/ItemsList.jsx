import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 340
  },
  titleClass: {
    boxShadow: "0 5px 15px rgba(0,0,0,.05)"
  },
  content: {
    padding: 0,
    margin: 0,
    "&:last-child": {
      padding: 0,
      margin: 0
    }
  },
  searchBar: {
    padding: theme.spacing(2),
    boxShadow: "0 -5px 15px rgba(0,0,0,.05)"
  }
}));

function ItemsList({
  avatar,
  action,
  title,
  subtitle,
  body,
  searchLabel,
  searchValue,
  searchOnChange
}) {
  const { card, content, searchBar, titleClass } = useStyles();

  return (
    <Card className={card}>
      <CardHeader
        avatar={avatar}
        action={action}
        className={titleClass}
        title={<Typography variant="h5">{title}</Typography>}
        subheader={subtitle}
      />
      <CardContent className={content}>
        {body}
        <div className={searchBar}>
          <TextField
            variant="outlined"
            style={{ width: "100%" }}
            label={searchLabel}
            value={searchValue}
            onChange={searchOnChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ItemsList;
