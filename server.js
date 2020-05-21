//Install express server
const express = require('express');
const path = require('path');
const cors_proxy = require('cors-anywhere');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/FrontEnd'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/FrontEnd/index.html'));
});

/*app.use(function(req,res,next){
  res.header("Acces-Control-Allow-Origin", '*');
  next();
});*/
app.use(cors_proxy.createServer(
  {
    originWhitelist: [],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
  }));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
