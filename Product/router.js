const { Router } = require("express");
const Product = require("./model");
const router = new Router();

router.get("/product", (req, res, next) => {
  Product.findAll()
    .then(product => {
      res.json(product);
    })
    .catch(next);
});

 router.post("/product", (req, res, next) => {
  Product.create({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
  })
    .then(product => res.json(product))
    .catch(err => next(err));
 })

router.get("/product/:productId", (req, res, next) => {
  Product.findByPk(parseInt(req.params.productId))
    .then(product => res.send({ product }))
    .catch(next);
});


module.exports = router;