'use strict'

var router = require('express').Router();



router.use(function(req, res, next) {
  console.log('auth midddleware: ', req.session.userId)
  if (!req.session.userId) {
    res.status(401).end()
  }
  next();
})

module.exports = router;