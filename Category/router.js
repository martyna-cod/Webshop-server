const { Router } = require("express");
const Category = require("./model");

const router = new Router();

router.get("/category", (req, res, next) => {
  Category.findAll()
    .then(category => {
      res.json(category);
    })
    .catch(next);
});

router.post("/category", (req, res, next) => {
  Category.create({
    name: req.body.name,
  
  })
    .then(category => res.json(category))
    .catch(err => next(err));
});


router.get("/category/:categoryId", (req, res, next) => {
  Category.findByPk(parseInt(req.params.categoryId))
    .then(category => res.send({ category }))
    .catch(next);
});


module.exports = router;