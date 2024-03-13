// Dimitri
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let increment = 0;

let shortUrlList = [
  "nada",
];

function checkUrl (string) {
  let givenURL ;
  try {
      givenURL = new URL (string);
  } catch (error) {
      console.log ("error is", error);
     return res.json({ error: 'invalid url' }); 
  }
  return true;
}


app.post('/api/shorturl', function(req, res) {  
  let givenURL ;
  try {
    givenURL = new URL (req.body.url);
} catch (error) {
  console.log ("error is", error);
 return res.json({ error: 'invalid url' }); 
}
  const shortcode=shortUrlList.length;
  shortUrlList.push(req.body.url);
  res.json({original_url: req.body.url, short_url: shortcode})
})

app.get('/api/shorturl/:arg?', function(req, res) {
  res.redirect(shortUrlList[req.params.arg])
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
