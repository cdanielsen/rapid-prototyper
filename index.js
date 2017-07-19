const express = require('express');
const exphbs = require('express-handlebars');
const twilio = require('twilio');

const app = express();
const port = 3000;

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(ACCOUNT_SID, AUTH_TOKEN);

// App config
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Top level route
app.get('/', async (request, response, next) => {
  client.messages.list().then(listOfMessages => {
    const messages = listOfMessages.map(message => message.body);
    response.render( 'view', {messages: messages} );
  });
})

// Server listener
app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
});
