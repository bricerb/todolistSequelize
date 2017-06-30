const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const router = require('./routes/router.js');
const morgan = require('morgan');

const app = express();

// Morgan to log router activity
if (app.get('env') == 'production') {
  app.use(morgan('common', {
    skip: function(req, res) {
      return res.statusCode < 400
    },
    stream: __dirname + '/../morgan.log'
  }));
} else {
  app.use(morgan('dev'));
};

// Middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(express.static('public'));

// Mustache engine and setup
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set ('view engine', 'mustache');

// Importing router
app.use(router);

// Listening on port: 3000
app.listen(3000, function() {
  console.log("Working");
});
