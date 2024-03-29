const Person = require('../models/person');
const Cars = require('../models/cars')
const Vendors = require('../models/vendors')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


function connect2db() {
    mongoose.connect('mongodb://localhost:27017/social_network',
        { useNewUrlParser: true });

    mongoose.connection.once('open', function () {
        console.log("Connection to MongoDB made...");
    }).on('error', function (error) {
        console.log("Error connecting to MongoDB. Error:", error);
    });
}

function saveCar(c, cb) {
    connect2db();
    var c1 = new Cars(c);
    c1.save(function(err){
        if(err) {
            console.log("Error creating car" + err)
        }
        cb(err);
    });
}

function saveVendors(v, cb) {
    connect2db();
    var v1 = new Vendors(v);
    bcrypt.hash(v1.password, 10, function(err, hash){
        v1.password = hash;
        v1.save(function(err){
            if(err) {
                console.log("Error creating user" + err)
            }
            cb(err);
        });
    });
}

function savePerson(p, cb) {
    connect2db();
    var p1 = new Person(p);
    bcrypt.hash(p1.password, 10, function(err, hash){
        p1.password = hash;
        p1.save(function(err){
            if(err) {
                console.log("Error creating user" + err)
            }
            cb(err);
        });
    });
}


function search(pattern, cb) {
    connect2db();
    Person.find({$or: [
                        {first_name: {$regex: pattern }},
                        {last_name:{$regex: pattern }}
                      ]
    }, function(err, users){
        cb(err, users);
    });
}

function deleteUser(id, cb) {
    connect2db();
    Person.deleteOne({"_id": id}, function (err, res) {
       if(err) {
           console.log("Error deleting user" + err);
       }
       cb(err);
    });
}

function getAllPersons(cb) {
    connect2db();
    Person.find(function(err, users) {
        if(err) {
            console.log('Error getting users' + err);
        }
        cb(err, users);
    });
}

function getAllCars(cb) {
    connect2db();
    Cars.find(function(err, cars) {
        if(err) {
            console.log('Error getting users' + err);
        }
        cb(err, cars);
    });
}

function getAllVendors(cb) {
    connect2db();
    Vendors.find(function(err, vendor) {
        if(err) {
            console.log('Error getting users' + err);
        }
        cb(err, vendor);
    });
}

function getPersonByUsername(username, cb) {
    connect2db();
    Person.findOne({'username': username}, function(err, user){
        cb(err, user);
    });
}

function getVendorByUsername(name, cb) {
    connect2db();
    Vendors.findOne({'name': name}, function(err, vendor){
        cb(err, vendor);
    });
}

function getPersonById(userid, cb) {
    connect2db();
    Person.findOne({'_id': userid}, function(err, user){
        cb(err, user);
    });
}

function updateEmailOnUser(userid, email, cb) {
    connect2db();
    Person.updateOne({'_id': userid}, {$set: {'email': email}},  function(err){ 
        cb(err)
    });
} 

module.exports = {
    saveVendors: saveVendors,
    savePersonFromForm: savePerson,
    findPersons: getAllPersons,
    search: search,
    deleteUser: deleteUser,
    getUserByUsername: getPersonByUsername,
    getUserById: getPersonById,
    getAllCars: getAllCars,
    saveCar: saveCar,
    updateEmailOnUser: updateEmailOnUser,
    getAllVendors: getAllVendors,
    getVendorByUsername: getVendorByUsername,
};