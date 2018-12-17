const db = require('../../../db')
const bcrypt = require('bcrypt-as-promised')
const shopModel = require('./shops')

function login(shop_username, email, password){
  let staff
  return shopModel.getShopByName(shop_username)
  .then(response => {
    if (response.archived) throw { status: 400, message: "Bad Request" }
    return shopModel.getStaffByEmail(email, response.id)
      .then(data => {
      if (!data || data.archived) throw { status: 400, message: "Bad Request" }
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

function updateSelf(staff_id, shop_id) {
  return shopModel.getOneStaff(staff_id, shop_id)
  .then(self => {
    delete self.password
    return self
  })
}

module.exports = {
  login,
  updateSelf
}
