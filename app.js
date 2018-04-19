const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// Load models
require('./models/User');
require('./models/Todo');

// Mongoose connect
mongoose.connect('mongodb://Nick:tadoo10536087@ds149279.mlab.com:49279/tadoo_dev')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Load Routes
const index = require('./routes/index');
const users = require('./routes/users');
const todos = require('./routes/todos');

// Passport config
require('./config/passport')(passport);

// Express Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Express Session Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Use Routes
app.use('/', index);
app.use('/users', users);
app.use('/todos', todos);

// Set up port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
