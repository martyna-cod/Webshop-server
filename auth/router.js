const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const User = require("../user/model");
const bcrypt = require("bcrypt");
const auth = require('./middleWare')
const router = new Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({
      message: "Please supply a valid userName and password"
    });
  } else {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: "User with that username does not exist"
          });
        } else if (bcrypt.compareSync(req.body.password, entity.password)) {
          //our solution is here
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ userId: entity.id }),
            id: entity.id,
            username: entity.username
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