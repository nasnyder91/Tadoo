const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const { ensureAuthenticated } = require('../helpers/auth');
const { setSortParams, sortTodos } = require('../helpers/sort');

const Todo = mongoose.model('todos');

// Show todos index Route
router.get('/', ensureAuthenticated, (req, res) => {
  const sortParams = setSortParams(req.query.sort);

  Todo.find({user: req.user.id})
    .collation({locale:'en', strength: 2})
    .sort(sortParams)
    .then(todos => {
      todos = sortTodos(todos, req.query.sort);

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
    const time = new Date(moment(req.body.time, 'hh:mm A', true).valueOf());
    newTodo.dueTime = time;
  }

  new Todo(newTodo)
    .save()
    .then(todo => {
      res.redirect('/');
    });
});

// Edit Todo Route
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Todo.findOne({
    _id: req.params.id
  })
    .then(todo => {
      if(todo.user != req.user.id){
        res.redirect('/');
      } else{
        res.render('todos/edit', {
          todo: todo
        });
      }
    })
});

// Edit Form Submit Route
router.put('/:id', ensureAuthenticated, (req, res) => {
  Todo.findOne({
    _id: req.params.id
  })
    .then(todo => {
      todo.title = req.body.title;
      todo.description = req.body.description;
      if(req.body.date){
        const date = new Date(moment(req.body.date, 'MMM DD, YYYY', true).valueOf());
        todo.dueDate = date;
      } else{
        todo.dueDate = '';
      }
      if(req.body.time){
        const time = new Date(moment(req.body.time, 'hh:mm a', true).valueOf());
        todo.dueTime = time;
      } else{
        todo.dueTime = '';
      }

      todo.save()
        .then(todo => {
          res.redirect('/');
        });
    });
});

// Delete Todo Route
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Todo.remove({
    _id: req.params.id
  })
    .then(() => {
      res.redirect('/');
    });
});


module.exports = router;
