const db = require('../../../db')
const bcrypt = require('bcrypt-as-promised')
const shopModel = require('./shops')

function login(shop_username, email, password){
  let staff
  return shopModel.getShopByName(shop_username)
  .then(response => {
    return shopModel.getStaffByEmail(email, response.id)
    .then(data => {
      if (!data) throw { status: 400, message: "Bad Request" }
      staff = data
      return bcrypt.compare(password, data.password)
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw { status: 401, message: "Unauthorized" }
    })
    .then(() => {
      delete staff.password
      return staff
    })
  })
}

module.exports = {
  login
}
