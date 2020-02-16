const Sequelize = require('sequelize')
const sequelize = require('../db')
const Category = require('../Category/model')

const Product = sequelize.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  timestamps: false,
  tableName: 'products'
})

Product.belongsTo(Category) 
Category.hasMany(Product) 




module.exports = Product