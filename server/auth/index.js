'use strict';
var User = require('../api/users/user.model');
var router = require('express').Router();

router.get('/logout', function(req, res, next) {
  req.session.userId = undefined;
  console.log('sesssion: ', req.session.userId)
  res.status(200).redirect('/');
})



router.post('/login', function(req, res, next) {
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
module.exports = router;