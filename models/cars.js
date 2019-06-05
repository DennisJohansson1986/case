const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Cars Schema
const CarsSchema = new Schema({
    reg_nr: String,
    manufacturer: String,
    model: String,
    year: String,
    color: String,
}, {collection: 'cars'});

//create model
const Cars = mongoose.model('cars', CarsSchema);

module.exports = Cars;