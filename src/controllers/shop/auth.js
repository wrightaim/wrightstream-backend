const authModel = require('../../models/shop/auth')
const jwt = require('jsonwebtoken')
const db = require('../../../db')



function login(req, res, next){
  if(!req.body.email){
    return next({ status: 400, message: 'Bad request'})
  }
  if(!req.body.password){
    return next({ status: 400, message: 'Bad request'})
  }
  authModel.login(req.body.shop_username, req.body.email, req.body.password)
  .then(({id, email, first_name, last_name, photo, shop_id, role_id}) => {
    const token = jwt.sign({id, email, first_name, last_name, photo, shop_id, role_id}, process.env.SECRET)
    return res.status(200).send({token})
  })
  .catch(next)
}

function getAuthStatus(req, res, next){
    res.status(200).send({...req.claim})
}

//////////////////////////////////////////////////////////////////////////////
// Quality of Life functions
//////////////////////////////////////////////////////////////////////////////

function isAuthenticated(req, res, next){
  if(!req.headers.authorization){
    return next({ status: 401, message: 'Unauthorized' })
  }
  const [scheme, credentials] = req.headers.authorization.split(' ')
  jwt.verify(credentials, process.env.SECRET, (err, payload) => {
    if(err){
      return next({ status: 401, message: 'Unauthorized' })
    }
    req.claim = payload
    next()
  })
}

function updateSelf(req, res, next) {
  authModel.updateSelf(req.claim.id, req.claim.shop_id)
  .then(self => {
    req.claim.email = self.email
    req.claim.first_name = self.first_name
    req.claim.last_name = self.last_name
    req.claim.photo = self.photo
    req.claim.role_id = self.role_id  
    next()
  })
}

function isSelf(req, res, next){
  if(parseInt(req.params.staffId) !== req.claim.id){
    return next({ status: 401, message: 'Unauthorized' })
  }
  next()
}


module.exports = {
  login,
  getAuthStatus,
  isAuthenticated,
  updateSelf,
  isSelf,
}
