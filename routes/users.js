var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/authenticate");
var passportLocalMongoose  =require('passport-local-mongoose');


var userSchema = mongoose.Schema({
  username :String,
  password :String,
  products: [{type : mongoose.Schema.Types.ObjectId , ref:'author'}]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('user', userSchema);
