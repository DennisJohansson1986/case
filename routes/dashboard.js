const express = require('express');
const router = express.Router();
const da = require('../data_access/da');

const rdl = (req, res, next) => {
    if(!req.session['userid']) {
        res.redirect('/login');
    }
    else {
        next();
    }
};

router.post('/updateUser', function(req, res){
  var userid = req.session['userid'];
  email = req.body['email'];
  da.updateEmailOnUser(userid, email, function(err){
    res.redirect('/dashboard');
  });
});

router.get('/', rdl, function(req, res){
    da.getUserById(req.session['userid'], function(err, u){
      var userid = req.session['userid'];
      res.render('dashboard', {
        title: "Dashboard for " + u.first_name, 
        user: u,
        userid: userid,
      });
    });
  });

module.exports = router;