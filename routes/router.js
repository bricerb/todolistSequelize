const express = require('express');
const router = express.Router();
const models = require('../models');

// Home page, view: todo
router.get('/', function(req, res) {
  models.todos.findAll().then(function(data) {
    res.render('todo', {todo : data});
  });
});

// Add a new todo if it does not already exist
router.post('/', function(req, res) {
  let todo = req.body.todo;
  models.todos.findOrCreate({
    where: {
      todo: todo
    },
    defaults: {
      todo: todo,
      complete: false
    }
  }).then(function() {
    res.redirect('/');
  });
});

// Mark todo complete
router.get('/update/:i', function(req, res) {
  let i = req.params.i;
  models.todos.update({
    complete: true
  }, {
    where: {
      id: i
    }
  }).then(function() {
    res.redirect('/');
  });
});

// Delete todo
router.get('/delete/:i', function(req, res) {
  let i = req.params.i;
  models.todos.destroy({
    where: {
      id: i
    }
  }).then(function() {
    res.redirect('/');
  });
});

module.exports = router;
