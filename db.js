const Sequelize = require('sequelize')
databaseUrl = 'postgres://postgres:secret@localhost:5432/postgres'
const db = new Sequelize(databaseUrl)


db.sync({force: false})
  .then(() => console.log('database connected'))
  .catch(error => console.error(error))

  module.exports = db