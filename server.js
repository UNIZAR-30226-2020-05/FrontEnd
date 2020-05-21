//Install express server
const express = require('express');
const path = require('path');
const cors_proxy = require('cors-anywhere');

const a = false;

if (a){
  var host = process.env.HOST || '0.0.0.0';
  var port = process.env.Port || 4200;
  cors_proxy.createServer(
    {
      originWhitelist: [],
      requireHeader: ['origin', 'x-requested-with'],
      removeHeaders: ['cookie', 'cookie2']
    }
  ).listen(port, host, function(){
    console.log('Running CORS Anywhere on ' + host + ':' + port);
  })
}
else{
  const app = express();

  app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/api', apiRoutes);

  // Serve only the static files form the dist directory
  app.use(express.static(__dirname + '/dist/FrontEnd'));

  app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/FrontEnd/index.html'));
  });

// Start the app by listening on the default Heroku port
  app.listen(process.env.PORT || 8080);
}
