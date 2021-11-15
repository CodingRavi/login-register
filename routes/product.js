var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/authenticate");


var productSchema = mongoose.Schema({
  name:String,
  desc:String,
  imgurl:String,
  price:Number,
  seller:{type : mongoose.Schema.Types.ObjectId  , ref:'author'}
});

module.exports = mongoose.model('product', productSchema);
