//Install express server
const express = require('express');
const path = require('path');
//const cors = require('cors');

const app = express();

app.use(function(req,res,next){
  res.header("Acces-Control-Allow-Origin", '*');
  next();
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/FrontEnd'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/FrontEnd/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
