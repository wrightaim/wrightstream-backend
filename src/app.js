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
app.use('/shops', require('./routes/Shop/shops'))
app.use('/auth', require('./routes/Shop/auth'))
app.use('/stores', require('./routes/Shop/stores'))



//////////////////////////////////////////////////////////////////////////////
// Default Route
//////////////////////////////////////////////////////////////////////////////
app.use(function(req, res, next){
  next({status: 404, message: 'Route not found' })
})

//////////////////////////////////////////////////////////////////////////////
// Error Handling
//////////////////////////////////////////////////////////////////////////////
app.use((err, req, res, next) => {
  err = processErrorMessage(err)
  if (process.env.NODE_ENV !== 'test') console.error(err)
  const status = err.status || 500
  const message = err.message || 'Internal Error.'
  res.status(status).json({ status, message })
})

//////////////////////////////////////////////////////////////////////////////
// Starting Server
//////////////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 5000

app.listen(port, function(){
  console.log(`Listening on port ${port}`)
})
