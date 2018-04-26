const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

const store = new MongoDBStore(
  {
    uri: 'mongodb://Nick:tadoo10536087@ds149279.mlab.com:49279/tadoo_dev',
    databaseName: 'tadoo_dev',
    collection: 'sessions'
  }
);

store.on('error', (err) => {
  assert.ifError(err);
  assert.ok(false);
});

// Load models
require('./models/User');
require('./models/Todo');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mongoose connect
mongoose.connect('mongodb://Nick:tadoo10536087@ds149279.mlab.com:49279/tadoo_dev')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Handlebar Helpers
const {
  formatDate,
  formatTime,
  truncate,
  stripTags
} = require('./helpers/hbs');

// Load Routes
const index = require('./routes/index');
const users = require('./routes/users');
const todos = require('./routes/todos');

// Passport config
require('./config/passport')(passport);

// Express Handlebars Middleware
app.engine('handlebars', exphbs({
  helpers: {
    formatDate: formatDate,
    formatTime: formatTime,
    truncate: truncate,
    stripTags: stripTags
  },
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Express Session Middleware
app.use(session({
  secret: 'secret',
  cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
          },
  store: store,
  resave: true,
  saveUninitialized: true
}));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method Override Middleware
app.use(methodOverride('_method'));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash Middleware
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
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
