var User = require('../models/user');
var Article = require('../models/article');
var Comment= require('../models/comment');
var _ = require('underscore');


 
module.exports = function(app) {  

  function siginRequired(req,res,next){
    var user = req.session.user;
    if (!user) {
      return res.redirect('/signin');
    }
    next();
  } 

  // 首页
  app.get('/',function (req, res) {

    console.log('user in session');  
    console.log(req.session.user);  
    Article.fetch(function(err,articles){
      Comment.fetch(function(err,comments){
        if (err) {
          console.log(err)
        }            
        res.render('index', {
          title: '主页',
          article: articles,
          comment: comments
        });
      });
    }); 
  });

  // 录入文章
  app.get('/display',siginRequired,function(err,res){
    res.render('display',{
      title:'录入文章页',
    })
  });

  // 删除文章
  app.delete('/admin/delarticle',siginRequired,function(req,res){
    var id = req.query.id;
    console.log(id);
    if (id) {
      Article.remove({_id:id},function(err,article){
        if (err) {
          console.log(err);
        }
        else{
          res.json({success:1});
        }
      });
    }
    else {
      res.json({success:-1});
    }
  });

  // 发表文章
  app.post('/admin/displayArticle',siginRequired,function(req,res){
    var articleObj= req.body.article;
    console.log(req.session.user);
    var _article;
    
    Article.findOne({title:articleObj.title},function(err,article){
      if(err){
        console.log(err);
      }
      if(article){

        _article = _.extend(article,articleObj);
        _article.save(function(err,article){
          if (err) {
            console.log(err);
          }
        });
      } 

      else{
        _article = new Article({
            title:articleObj.title,
            essayText:articleObj.essayText,
            author:req.session.user.name
          });
        _article.save(function(err,article){
          if(err){
            console.log(err);
          }
          res.redirect('/');
        });
      }
    });
  });

  // 注册路由
  app.get('/register',function(req,res){
    res.render('register',{
      title:"注册页",
    });
  });

  app.post('/admin/signup',function(req,res){
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
          res.redirect('/');
        });
      }
    });
  });

  // 登录路由 
  app.get('/signin',function(req,res){
    res.render('signin',{
      title:'登录'
    });
  });


  // 登录
  app.post('/admin/signin',function(req,res){
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
  });

  // 退出
  app.get('/signout',function(req,res){
    req.session.user='';
    app.locals.session='';
    res.redirect('/');
  });


  // 文章详情页
  app.get('/articleDetail/article',siginRequired,function(req,res){
    var id =req.query.id;
    Article.findOne({title:id},function(err,article){      
        if (err) {
          console.log(err);
        }
        if (!article) {
          res.redirect('/');
        }
                
        res.render('articleDetail',{
          title: "文章详情页",
          articles:article,         
        });                
    });
  });

   // 删除
  app.delete('/admin/article',function(req,res){
    var id = req.query.id;
    if (id) {
      Article.remove({_id:id},function(err,article){
        if (err) {
          console.log(err);
        }
        else {
          res.json({success:1});
        }
      });
    }
  });

  // 评论
  app.post('/admin/commentlist',siginRequired,function(req,res){
    var _comment = req.body.comment;
    console.log(_comment);
    if (_comment.cAuthor=='undefined') {
      res.redirect('/signin');
    }
    else{
      var comment = new Comment(_comment);
      comment.save(function(err,comment){
            if(err){
              console.log(err);
            }
            res.redirect('/');
          });
        
      };
    })
}


