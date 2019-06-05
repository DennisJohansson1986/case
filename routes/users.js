var express = require('express');
var router = express.Router();
var da = require('../data_access/da')
const bcrypt =require("bcrypt")


/* GET users listing. */
router.get('/', function(req, res, next) {
  da.findPersons(function(err, users) {
    var userid = req.session['userid'];
    res.render('users/users', {title:'User listing', user_list: users, userid: userid});
  });
});

router.post('/', function(req, res, next) {
  da.savePersonFromForm(req.body, function(err){
    da.findPersons(function(err, users) {
      var userid = req.session['userid'];
      res.render('users/users', {title:'User listing', user_list: users, userid: userid});
    });
  });
});

router.get('/delete', function(req, res){
  da.deleteUser(req.query.id, function(err){
    da.findPersons(function(err, users) {
      var userid = req.session['userid'];
      res.render('users/users', {title:'User listing', user_list: users, userid: userid});
    });
  });
});

router.get('/add', function(req, res){
  var userid = req.session['userid'];
  res.render('users/add', {title: "Add User", userid: userid});
});

router.get('/login', function(req, res){
  res.render('users/login', {title: "Login"});
});

router.post('/login', function(req, res) {
  da.getUserByUsername(req.body['username'], function(err, user){
    if(user) {
        bcrypt.compare(req.body['password'], user.password, function(err, answer){
          if(answer) {
            req.session.userid = user._id
            res.redirect('/dashboard');
          }
          else {
            res.redirect('login', 401);
          }
        });
    }
    else {
      res.redirect('login', 401);
    }
      });

  });

module.exports = router;
