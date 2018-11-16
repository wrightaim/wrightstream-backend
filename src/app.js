const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').load()
}

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

//////////////////////////////////////////////////////////////////////////////
// USER ROUTES
//////////////////////////////////////////////////////////////////////////////
//AUTH AND SHOP ROUTES
app.use('/shops', require('./routes/shop/shops'))
app.use('/auth', require('./routes/shop/auth'))
app.use('/auth/etsy', require('./routes/shop/authEtsy'))
app.use('/etsy', require('./routes/shop/etsy'))
app.use('/stores', require('./routes/shop/stores'))

//PRODUCTS
app.use('/products', require('./routes/products/products'))
app.use('/categories', require('./routes/products/categories'))
app.use('/kinds', require('./routes/products/kinds'))
app.use('/types', require('./routes/products/types'))
app.use('/sources', require('./routes/products/sources'))
app.use('/supplies', require('./routes/products/supplies'))
app.use('/items', require('./routes/products/items'))
app.use('/bundles', require('./routes/products/bundles'))

//MEASUREMENTS
app.use('/helper', require('./routes/helper/measurement'))

//WRIGTHSTREAM
app.use('/purchases', require('./routes/workstream/purchases'))
app.use('/purchases_statuses', require('./routes/workstream/purchases_statuses'))
app.use('/purchases_items', require('./routes/workstream/purchases_items'))
app.use('/purchases_bundles', require('./routes/workstream/purchases_bundles'))
app.use('/comments', require('./routes/workstream/comments'))
app.use('/priority', require('./routes/workstream/priority'))
app.use('/recraft', require('./routes/workstream/recraft'))

//ADMIN
app.use('/admin_staff', require('./routes/admin/staff'))
app.use('/admin_products', require('./routes/admin/products'))
app.use('/admin_purchases', require('./routes/admin/purchases'))
app.use('/admin_supplies', require('./routes/admin/supplies'))

//INVENTORY
app.use('/inventory', require('./routes/inventory/inventory'))
app.use('/orders', require('./routes/inventory/orders'))
app.use('/lists', require('./routes/inventory/lists'))

//////////////////////////////////////////////////////////////////////////////
// Default Route
//////////////////////////////////////////////////////////////////////////////
app.use(function(req, res, next){
  next({status: 404, message: 'Route not found' })
})

//////////////////////////////////////////////////////////////////////////////
// Error Handling
//////////////////////////////////////////////////////////////////////////////
app.use(function(err, req, res, next){
  const errorMessage = {}
  if(process.env.NODE_ENV !== 'production' && err.stack)
  errorMessage.stack = err.stack
  errorMessage.status = err.status || 500
  errorMessage.message = err.message || 'Internal Server Error'
  res.status(errorMessage.status).send(errorMessage)
})


//////////////////////////////////////////////////////////////////////////////
// Starting Server
//////////////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 5000

app.listen(port, function(){
  console.log(`Listening on port ${port}`)
})
