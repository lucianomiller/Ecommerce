import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    paddingTop: theme.spacing(6),
  },
  contenido: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  fondo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

export default function Contacto() {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  return (
    <div className={classes.content}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Card className={classes.contenido}>
            <h1>Sobre de Nosotros</h1>
            <Typography variant="h6" gutterBottom>
              Somos el equipo que desarrollo Builder, un marketplace para la
              venta de Materiales y herramientas para la industria, desde áreas
              como la Construcción , Metalurgia, Mecanica, entre otros. Este
              proyecto nace de la necesidad de poder encontrar proveedores de
              distintos rubros, y poder democratizar la venta de materiales,
              herramientas para un rubro tan clave como la Industria.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className={classes.fondo}>
            <CardContent>
              <Avatar
                alt="Billy Bautista"
                // src=
                className={classes.large}
              />
              <h3>Billy Bautista</h3>
              <Link
                href="https://github.com/billybautista"
                target="_blank"
                color="inherit"
              >
                <GitHubIcon style={{ fontSize: 60 }} />
              </Link>

              <Link
                href="https://www.linkedin.com/in/billy-bautista/"
                target="_blank"
                color="inherit"
              >
                <LinkedInIcon style={{ fontSize: 60, color: "#0e76a8" }} />
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Card className={classes.fondo}>
            <CardContent>
              <Avatar alt="LD" className={classes.large} />
              <h3> Luis Diaz</h3>
              <Link href="https://github.com/" target="_blank" color="inherit">
                <GitHubIcon style={{ fontSize: 60 }} />
              </Link>

              <Link
                href="https://www.linkedin.com/"
                target="_blank"
                color="inherit"
              >
                <LinkedInIcon style={{ fontSize: 60, color: "#0e76a8" }} />
              </Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className={classes.fondo}>
            <CardContent>
              <Avatar alt="LM" className={classes.large} />
              <h3>Lucas Mercado</h3>
              <Link href="https://github.com/" target="_blank" color="inherit">
                <GitHubIcon style={{ fontSize: 60 }} />
              </Link>
              <Link
                href="https://www.linkedin.com/"
                target="_blank"
                color="inherit"
              >
                <LinkedInIcon style={{ fontSize: 60, color: "#0e76a8" }} />
              </Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className={classes.fondo}>
            <CardContent>
              <Avatar className={classes.large} />
              <h3>Luciano Miller</h3>
              <Link href="https://github.com/" target="_blank" color="inherit">
                <GitHubIcon style={{ fontSize: 60 }} />
              </Link>

              <Link
                href="https://www.linkedin.com/"
                target="_blank"
                color="inherit"
              >
                <LinkedInIcon style={{ fontSize: 60, color: "#0e76a8" }} />
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
