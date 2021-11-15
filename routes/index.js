var express = require('express');
const passport = require('passport');
var router = express.Router();
var UserModel = require('./users');
var productModel = require('./product');
const localStrategy = require('passport-local');
const { request } = require('express');
passport.use(new localStrategy(UserModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/delete/:_id', function(req, res, next) {
  productModel.findOneAndDelete({_id:req.params._id} ,{new:true}).then(ndata=>{
    res.redirect('/profile')
    })
});


router.get('/update/:_id', function(req, res, next) {
  productModel.find({_id:req.params._id} ).then(pdata=>{
    res.render('update' ,{ all:pdata})
    })
});

router.post('/update/:_id', function(req, res, next) {
  var data ={
    name:req.body.name,
    desc:req.body.desc,
    imgurl:req.body.imgurl,
    price:req.body.price,
    
  }
  productModel.findOneAndUpdate({ _id:req.params._id},{$set:data} , function(err,doc){
    if(err){
      console.log("jhcbc");
  }

  res.render('profile')
});

});


router.post('/register',function(req,res ,next){
  var newUser = new UserModel({
    username : req.body.username,
    

  })
  UserModel.register(newUser , req.body.password )
  .then(function(u){
    passport.authenticate('local')(req,res,function(){
      res.render('profile')
    })
  }).catch(function(e){
    res.send(e);
  })
})


router.post("/profile" , isLoggedIn,  function(req,res){
  productModel.create({
    name:req.body.name,
    desc:req.body.desc,
    imgurl:req.body.imgurl,
    price:req.body.price,
    seller:req.session.passport.userz
  }).then(function(){
    res.redirect('/profile')
  })
    
  })
    router.get("/profile" , isLoggedIn,  function(req,res){
    productModel.find().then(function(dets){
      res.render('profile' , {all:dets})
    })
    })
  
  

router.post('/login', passport.authenticate('local',{
  successRedirect:'/profile',failureRedirect:'/'
}), function(req,res ,next){
 console.log("hi hey")
})

router.get('/logout' , function(req, res){
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();

  }
  else{
    res.redirect('/');
  }
}



module.exports = router;
