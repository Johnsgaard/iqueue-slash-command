require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

// Creates express app
const app = express();

// The port used for Express server
const PORT = 3000;

// Starts server
app.listen(process.env.PORT || PORT, function() {
  console.log('Bot is listening on port ' + PORT);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/', (req, res) => {

  var data = {
    response_type: 'in_channel', // public to the channel 
    text: 'Hi :wave: \n This is Joshua\'s bot!', 
  };

  request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
    // Sends welcome message
    res.json(data);
  });
});

