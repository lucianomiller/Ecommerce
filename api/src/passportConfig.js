const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

const { User } = require("./db.js");

module.exports = function (passport) {
  passport.use('local-username',
    new localStrategy(
      {
        usernameField: "loginField",
      },
      (loginField, password, done) => {
        User.findOne({ where: { userName: loginField } }).then((user) => {

          if (!user) return done(null, false);
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
      }
    )
  );

  passport.use('local-email',
  new localStrategy(
    {
      usernameField: "loginField",
    },
    (loginField, password, done) => {
      User.findOne({ where: { email: loginField } }).then((user) => {
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    }
  )
);

  // guarda el user.id al cookie enviado al front
  passport.serializeUser((user, cb) => {
   // console.log('user serial', user)
    cb(null, user.id);
  });

  // usa el id del cookie y
  // ( unicamente ) le añade 'user' al req (req.user)
  passport.deserializeUser((id, cb) => {
    User.findOne({ where: { id }, include: { all: true } })
      .then((user) => {
        cb(false, user);
      })
      .catch((err) => cb(err, false));
  });
};

