const express = require('express'),
  request = require('request'),
  secrets = require('./secrets'),
  app = express(),
  port = 3000;

app.listen(port, () => console.log(`Snackbot app listening on port ${port}!`));

app.get('/', (req, res) => res.send(`Ngrok is up! Our path is: ${req.url}`));
app.get('/oauth', (req, res) => {
  if (!req.query.code) {
    res.status(500);
    res.send({'Error': 'We aren\'t getting a code.'});
    console.log('No code...');
  } else {
    request({
      //Our URL
      url: 'https://slack.com/api/oauth.access', 
      //Query String data
      qs: { 
        code: req.query.code,
        client_id: secrets.clientID,
        client_secret: secrets.clientSecret
      },
      method: 'GET',
    }, (err, res, body) => {
      if (err) {
        console.log(error);
      } else {
        res.json(body);
      }
    });
  }
});

app.post('/command', function(req, res) {
  res.send('Our tunnel is working great!');
});