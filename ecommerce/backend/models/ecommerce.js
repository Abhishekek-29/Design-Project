
const mongoose = require('mongoose');

const ecSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
});

const ecModel = mongoose.model('Ecommerce', ecSchema);

module.exports = ecModel;
