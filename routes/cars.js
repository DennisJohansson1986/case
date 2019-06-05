var express = require('express');
var router = express.Router();
var da = require('../data_access/da')


/* GET cars listing. */ 
router.get('/', function(req, res, next) {
  da.getAllCars(function(err, cars) {
    var userid = req.session['userid'];
    res.render('cars/cars', {title:'Cars listing', cars_list: cars, userid: userid});
    });
  });

router.post('/', function(req, res, next) {
  da.saveCar(req.body, function(err){
    da.getAllCars(function(err, cars) {
      var userid = req.session['userid'];
      res.render('cars/cars', {title:'Cars listing', cars_list: cars, userid: userid});
    });
  });
});

router.get('/add', function(req, res, next) {
  da.getAllCars(function(err, cars) {
    da.findPersons(function(err, users) {
      var userid = req.session['userid'];
      res.render('cars/add', {title:'Add car',user_list: users, cars_list: cars, userid: userid});
    });
  });
});

  
module.exports = router;