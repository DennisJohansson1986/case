const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Vendors Schema
const VendorsSchema = new Schema({
    vendor_name: String,
    email: String,
    username: String,
    password: String,
    customers: [String],
}, {collection: 'vendors'});

//create model
const Vendors = mongoose.model('vendors', VendorsSchema);

module.exports = Vendors;