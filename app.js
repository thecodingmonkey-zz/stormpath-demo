var DEBUG_MODE = true;

var express = require('express');
var stormpath = require('express-stormpath');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: './apiKey.properties',
  application: 'https://api.stormpath.com/v1/applications/OHg25dgtxeaR0stTsOc4A',
  secretKey: 'testing this stormpath api',
  expandCustomData: true,
  enableForgotPassword: true
});

app.use(stormpathMiddleware);

app.get('/', function(req, res) {
  console.log('hi');
  res.render('home', {
    title: 'Welcome'
  });
});

if (DEBUG_MODE !== true) {
  app.use(stormpath.loginRequired);
}

app.get('/sekrit', function(req, res) {
  res.render('hiddendata')

})

app.listen(3000);

