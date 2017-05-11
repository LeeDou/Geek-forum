var Article = require('../models/article');  
var _ = require('underscore');

exports.display=function(err,res){
  res.render('display',{
    title:'录入文章页',
     tag: 'display'
  });
};

exports.del=function(req,res){
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
};

exports.add=function(req,res){
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
};

exports.detail=function(req,res){
  var id =req.query.id;
  Article.findOne({_id:id},function(err,article){      
    if (err) {
      console.log(err);
    }
    if (!article) {
      res.redirect('/');
    }            
    res.render('articleDetail',{
      title: "文章详情页",
      articles:article,
      tag: 'articleDetail'         
    });                
  });
};

exports.delat=function(req,res){
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
};
