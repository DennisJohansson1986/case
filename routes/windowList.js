var express = require('express');
var router = express.Router();
var da = require('../data_access/da')

router.get('/', function(req, res) {
  da.findPersons(function(err, users) {
    var userid = req.session['userid'];
    res.render('windowList', {title:'User listing', user_list: users, userid: userid});
    });
  });
  
module.exports = router;