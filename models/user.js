const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userShecma = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

userShecma.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userShecma)