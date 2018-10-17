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
  authModel.login(req.body.email, req.body.password)
  .then(function({id, email, first_name, last_name, photo, shops_id, role_id }){
    const token = jwt.sign({ id, email, first_name, last_name, photo, shops_id, role_id }, process.env.SECRET)
    return res.status(200).send({ token })
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
  jwt.verify(credentials, process.env.SECRET, (err, payload)=>{
    if(err){
      return next({ status: 401, message: 'Unauthorized' })
    }
    req.claim = payload
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
  isSelf,
}
