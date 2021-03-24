const server = require("express").Router();
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");

const passport = require("passport");
const { User, Orden } = require("../db.js");

const client = new OAuth2Client(
  "1092355223425-8dsi29tie144eofnada1gv1c4n7lufrl.apps.googleusercontent.com"
);

server.get("/", (req, res) => {
  User.findAll({
    include: {
      model: Orden,
      as: "ordenes",
    },
  })
    .then((resp) => {
      res.json(resp);
    })
    .catch((error) => {
      res.json(error);
    });
});

server.get("/username", (req, res) => {
  const userName = req.query.q;

  User.findOne({ where: { userName } })
    .then((resp) => {
      if (resp.dataValues.userName === userName) {
        res.json(resp);
      }
    })
    .catch((err) => {
      res.json({ msg: "User Not Found", err });
    });
});

server.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    role,
    cuit,
    ubicacion,
    activate
  } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const [_, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        password: hashedPassword,
        firstName,
        lastName,
        cuit,
        ubicacion,
        userName,
        role,
        activate
      },
    })
    
    if (!created) return res.status(400).json("Usuario ya existe");
    res.status(200).json(_.dataValues)
  } catch (err) {
    return res.json(err);
  }
});

server.get("/isLoggedIn", (req, res) => {
  req.user && req.isAuthenticated()
    ? res.json({ role: req.user.role, id: req.user.id })
    : res.sendStatus(401);
});

server.post("/login/username", async (req, res, next) => {
  passport.authenticate("local-username", (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(404).send("User o contraseña incorrecta");
    }
    if (user) {
      if (user.banned === true) return res.status(404).send("Usuario baneado");
      if (user.changePass === true)
        return res.status(404).send("Debe cambiar su contraseña");
      if (user.activate === false)
        return res.status(404).send("Debe activar usuario");

      req.login(user, (err) => {
        if (err) throw err;
        let iniciales = (user.firstName[0] + user.lastName[0]).toUpperCase();
        res.json({ role: req.user.role, iniciales, id: req.user.id });
      });
    }
  })(req, res, next);
});
server.post("/login/email", async (req, res, next) => {
  passport.authenticate("local-email", (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(404).send("User o contraseña incorrecta");
    }
    if (user) {
      if (user.banned === true) return res.status(404).send("Usuario baneado");
      if (user.changePass === true)
        return res.status(404).send("Debe cambiar su contraseña");
      if (user.activate === false)
        return res.status(404).send("Debe activar usuario");
      req.login(user, (err) => {
        if (err) throw err;
        let iniciales = (user.firstName[0] + user.lastName[0]).toUpperCase();
        res.json({ role: req.user.role, iniciales, id: req.user.id });
      });
    }
  })(req, res, next);
});

server.get("/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

server.put("/", async (req, res) => {
  const { username } = req.query;
  const { oldPassword, newPassword } = req.body;
  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  User.update(
    { changePass: false, password: newHashedPassword },
    {
      where: {
        userName: username,
      },
    }
  );

  res.send("ok");
});

server.put("/activate", (req, res) => {
  const { email } = req.query;
  const { activate } = req.body;

  User.update(
    {
      activate,
    },
    {
      where: {
        email: email,
      },
    }
  );

  res.send("ok");
});

server.put("/:id", (req, res) => {
  const { id } = req.params;
  // const {role} = (req.query)

  const {
    firstName,
    lastName,
    userName,
    email,
    role,
    changePass,
    banned,
  } = req.body;

  User.update(
    {
      firstName,
      lastName,
      userName,
      email,

      role,
      changePass,
      banned,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((resp) => {
      res.json(req.body);
    })
    .catch((e) => {
      res.json(e);
    });
});

server.delete("/:id", (req, res) => {
  User.destroy({
    where: { id: req.params.id },
  })
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(400).json("Categoría no encontrada"));
});

module.exports = server;
