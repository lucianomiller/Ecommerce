const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");
const session = require("express-session");
const cookieSession = require('cookie-session')


const passport = require("passport");

require("./db.js");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
    //methods: 'GET, POST, PUT'
  })
);
//http://localhost:3000
server.use(bodyParser.json({ limit: "50mb" }));
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// -------USER SESSION------

const SESSION_SECRET = "secret_code_1234";

server.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
server.use(cookieParser(SESSION_SECRET));
//---------GOOGLE SESSION-----
// server.use(session({
//   resave: false,
//   saveUninitialized: true,
//   secret: 'SECRET' 
// }));
// server.use(cookieParser('SECRET'));


server.use(passport.initialize());
server.use(passport.session());
require("./passportConfig")(passport);


// -------------------------

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
