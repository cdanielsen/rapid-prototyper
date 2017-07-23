const express = require('express')
const exphbs = require('express-handlebars')
require('dotenv').config()

const app = express()
const port = 3000

// App config
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Serve static files from ./assets
app.use(express.static('assets'))

// Top level route
app.get('/', async (request, response) => {
  response.render('view', {message: 'Hello World!'})
})

// Server listener
app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
