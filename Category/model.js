const Sequelize = require('sequelize')
const sequelize = require('../db')


const Category = sequelize.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  timestamps: false,
  tableName: 'categories'
})

module.exports = Category