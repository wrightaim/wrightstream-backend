const knex = require('../../../db')

function getAllPlatforms() {
  return (knex('platforms'))
}

module.exports = {
  getAllPlatforms
}
