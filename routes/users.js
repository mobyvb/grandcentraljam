var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      res.json(err);
    } else {
      res.json(users);
    }
  });
});

router.post('/', function(req, res, next) {
  var newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  newUser.save(function(err) {
    if (err) {
      res.json(err);
    } else {
      res.redirect('/users/' + req.body.username);
    }
  });
});

router.get('/:username', function(req, res, next) {
  console.log('getting ' + req.params.username);
  User.findOne({username: req.params.username}, function(err, user) {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

module.exports = router;
