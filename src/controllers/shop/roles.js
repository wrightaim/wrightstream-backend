const roleModel = require('../../models/shop/roles')

function getAllRoles(req, res, next){
  roleModel.getAllRoles()
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

module.exports = {
  getAllRoles
}
