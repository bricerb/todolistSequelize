const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(express.static('public'));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set ('view engine', 'mustache');

var todos = [
  {i: '0', todo: 'Derp', status: false},
  {i: '1', todo: 'Brain fart', status: false},
];
var i = 2;

app.get('/', function(req, res) {
  res.render('todo', {todo: todos});
});

app.post('/', function(req, res) {
  var curr = {};
  curr.i = i;
  i ++;
  curr.todo = req.body.todo;
  curr.status = false;
  todos.push(curr);
  res.redirect('/')
});

app.get('/:i', function(req, res) {
  var index = req.params.i;
  todos[index].status = !todos[index].status;
  res.redirect('/');
});

app.listen(3000, function() {
  console.log("Working");
});
