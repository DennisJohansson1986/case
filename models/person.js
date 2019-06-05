const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Person Schema
const PersonsSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    username: String,
    password: String,
    birthyear: Number,
    avatar: String,
    vendor: String,
}, {collection: 'persons'});

//create model
const Person = mongoose.model('person', PersonsSchema);

module.exports = Person;