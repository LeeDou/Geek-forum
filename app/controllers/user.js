var User = require('../models/user');
var _ = require('underscore');

exports.register=function(req,res){
  res.render('register',{
    title:"注册页",
    tag: 'register'
  });
};

exports.signup=function(req,res){
  var _user = req.body.user;
  User.findOne({name:_user.name},function(err,user){
    if(err){
      console.log(err);
    }
    if(user){
      return res.redirect('/signin');
    } 
    else{
      var user = new User(_user);
      user.save(function(err,user){
        if(err){
          console.log(err);
        }
        res.redirect('/signin');
      });
    }
  });
};

// 登录页路由 
exports.signin=function(req,res){
  res.render('signin',{
    title:'登录',
    tag: 'signin'
  });
};


// 登录
exports.sign=function(req,res){
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    User.findOne({name:name},function(err,user){
      if (err) {
        console.log(err);
      }
      if(!user){
        return res.redirect('/register');
      } 
      user.comparePassword(password,function(err,isMatch){
        if(err){
          console.log(err);
          console.log('002');
        }
        if(isMatch){
          req.session.user = user;
          return res.redirect('/');

        } else{
          res.redirect('/signin');
          console.log('Wrong Password!');
        }
      });
    });
  };

// 退出
exports.signout=function(req,res){
  req.session.user=null;
    // app.locals.session='';
    res.redirect('/');
};  
