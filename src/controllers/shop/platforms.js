const platformModel = require('../../models/shop/platforms')

function getAllPlatforms(req, res, next){
  platformModel.getAllPlatforms()
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

module.exports = {
  getAllPlatforms
}
