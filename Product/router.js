const { Router } = require("express");
const Product = require("./model");
const User = require("../User/model");
const auth = require("../auth/middleWare");
const { toData } = require("../auth/jwt");

const router = new Router();

router.get("/product", (req, res, next) => {
  console.log("blaaaaaaaaaaaaaaaaaaa")
  Product.findAll()
    .then(product => {
      res.json(product);
    })
    .catch(next);
});

router.get("/product/category/:categoryId", (req, res, next) => {
  const {categoryId} = req.params;

  Product.findAll({where: { categoryId: categoryId }})
    .then(product => {
      res.json(product);
    })
    .catch(next);
});

router.post("/product", (req, res, next) => {
  Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image, 
    categoryId: req.body.category
   
  
  })
    .then(product => res.json(product))
    .catch(err => next(err));
});


router.get("/product/:productId", (req, res, next) => {
  Product.findByPk(parseInt(req.params.productId))
    .then(product => res.send(product))
    .catch(next);
});

router.delete('/product/:productId', (req, res, next) => {
  const {productId} = req.params;
  console.log("deleting")
  Product.destroy({ where: {id: req.params.productId} 
})
.then(product => res.json(product))
.catch(err => next(err));
});


module.exports = router;