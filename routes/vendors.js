var express = require('express');
var router = express.Router();
var da = require('../data_access/da')
const bcrypt = require("bcrypt")

router.get('/', function(req, res, next) {
  da.getAllVendors(function(err, vendor){
    da.findPersons(function(err, users){
      var userid = req.session['userid'];
      res.render('vendors/vendors', {title:'Vendors listing', user_list: users, vendors_list: vendor, userid: userid});
    });
  });
});

router.post('/', function(req, res, next) {
  da.saveVendors(req.body, function(err){
    da.getAllVendors(function(err, vendor){
      da.findPersons(function(err, users){
        var userid = req.session['userid'];
        res.render('vendors/vendors', {title:'Vendors listing', user_list: users, vendors_list: vendor, userid: userid});
      });
    });
  });
});

router.get('/add', function(req, res, next) {
  da.getAllVendors(function(err, vendor) {
    da.findPersons(function(err, users) {
      var userid = req.session['userid'];
      res.render('vendors/add', {title:'Add car',user_list: users, vendors_list: vendor, userid: userid});
    });
  });
});

router.post('/login', function(req, res) {
  da.getVendorByUsername(req.body['vendor_name'], function(err, vendor){
    if(vendor) {
        bcrypt.compare(req.body['password'], vendor.password, function(err, answer){
          if(answer) {
            req.session.userid = vendor._id
            res.redirect('/vendors');
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

router.get('/login', function(req, res){
  res.render('vendors/login', {title: "Login"});
});

module.exports = router;