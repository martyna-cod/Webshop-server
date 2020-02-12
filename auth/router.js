const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const User = require("../User/model");
const bcrypt = require("bcrypt");
const auth = require('./middleWare')
const productRouter = require('../Product/router')

const router = new Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({
      message: "Please supply a valid username and password"
    });
  } else {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: "User with that email does not exist"
          });
        } else if (bcrypt.compareSync(req.body.password, entity.password)) {
          //our solution is here
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ userId: entity.id }),
            id: entity.id,
            email: entity.email
          });
        } else {
          res.status(400).send({
            message: "Password was incorrect"
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Something went wrong"
        });
      });
  }
});

router.get('/secret-endpoint', auth, (req, res) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(' ');
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    try {
      const data = toData(auth[1]);
      res.send({
        message: `Thanks for visiting the secret endpoint, ${req.user}`,
        data
      });
    } catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`
      });
    }
  } else {
    res.status(401).send({
      message: 'Please supply some valid credentials'
    });
  }
});

module.exports = router;