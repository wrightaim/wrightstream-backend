const knex = require('../../../db')

function getAllRoles () {
  return (knex('roles'))
}

module.exports = {
  getAllRoles
}
