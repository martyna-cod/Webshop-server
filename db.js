const Sequelize = require('sequelize')
databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres'
const db = new Sequelize(databaseUrl)


db.sync({force: true})
  .then(() => console.log('database connected'))
  .catch(error => console.error(error))

  module.exports = db