const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const { ensureAuthenticated } = require('../helpers/auth');

const Todo = mongoose.model('todos');

// Show todos index Route
router.get('/', ensureAuthenticated, (req, res) => {
  Todo.find({user: req.user.id})
    .then(todos => {
      res.render('todos/index', {
        todos: todos
      });
    });
});

// Add Todo Route
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('todos/add');
});

// Add Todo Post Route
router.post('/', ensureAuthenticated, (req, res) => {
  let newTodo = {
    title: req.body.title,
    description: req.body.description,
    user: req.user.id
  }
  if(req.body.date){
    const date = new Date(moment(req.body.date, 'MMM DD, YYYY', true).valueOf());
    newTodo.dueDate = date;
  }
  if(req.body.time){
    newTodo.dueTime = req.body.time;
  }

  new Todo(newTodo)
    .save()
    .then(todo => {
      res.redirect('/todos/index');
    });
});


module.exports = router;
