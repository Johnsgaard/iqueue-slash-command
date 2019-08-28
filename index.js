require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

// Creates express app
const app = express();

// The port used for Express server
const PORT = 3000;

let bathrooms = {
  gents: {
    stalls: 1,
    shower: 2,
  },
  ladies: {
    stalls: 3,
    shower: 1,
  },
};

// Starts server
app.listen(process.env.PORT || PORT, function() {
  console.log('Bot is listening on port ' + PORT);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/', (req, res) => {
  let responseMessage = ':poop: Something went wrong! :poop:';
  if (bathrooms[req.body.text]) {
    if (req.body.command === '/poop') {
      bathrooms[req.body.text].stalls = bathrooms[req.body.text].stalls - 1;
    } else if (req.body.command === '/flush') {
      bathrooms[req.body.text].stalls = bathrooms[req.body.text].stalls + 1;
      if (req.body.text === 'ladies' && bathrooms[req.body.text].stalls >= 3) {
        bathrooms[req.body.text].stalls = 3;
      } else if (req.body.text === 'gents' && bathrooms[req.body.text].stalls >= 1) {
        bathrooms[req.body.text].stalls = 1;
      }
    }
    if (bathrooms[req.body.text].stalls < 0) {
      bathrooms[req.body.text].stalls = 0;
      responseMessage = 'There are no more stalls left for the ' + req.body.text;
    } else {
      responseMessage = 'The ' + req.body.text + ' have ' + bathrooms[req.body.text].stalls + ' stall left ';
    }
  } else {
    responseMessage = 'The bathrooms do not have a ' + '`' + req.body.text+'`' + ' type :confused:.\n This command accepts [ ladies, gents ].';
  }

  var data = {
    response_type: 'in_channel', // public to the channel 
    text: responseMessage, 
  };

  request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
    // Sends welcome message
    res.json(data);
  });
});

