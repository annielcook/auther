'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');


app.use(require('./logging.middleware'));

app.use(require('./sass.middleware'));

app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));

app.use(session({
  secret: 'tongiscool'
}));

app.use(function(req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  console.log(req.session.userId)
  next();
});

var User = require('../api/users/user.model');
app.post('/auth/login', function(req, res, next) {
  // find user by email and password
  // if they exist send them back to the frontend
  // if they don't error 401
  User.findOne({
    email: req.body.email
  }).exec()
    .then(function(user) {
      if (user && user.authenticate(req.body.password)) {
        req.session.userId = user._id;
        res.json(user);
      }
      // did not find user
      else {
        var err = new Error('Not Authenticated');
        err.status = 401;
        next(err);
      }
    })
  // error with query/db
  .then(null, next);
});

app.use('/api', require('../api'));

app.get('/logout', function(req, res, next) {
  console.log(req.session);
  console.log('hi')
  req.session.userId = undefined;
  res.redirect('/');
})

app.get('/*', function(req, res) {
  var index = path.join(__dirname, '..', '..', 'public', 'index.html');
  res.sendFile(index);
});


app.use(require('./error.middleware'));

module.exports = app;