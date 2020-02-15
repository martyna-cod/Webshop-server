const Sequelize = require('sequelize')
const sequelize = require('../db')

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
  category: {
    type: Sequelize.STRING, 
    allownull: true
  }
}, {
  timestamps: false,
  tableName: 'products'
})

module.exports = Product