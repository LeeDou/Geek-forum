var Article = require('../models/article');
var Comment = require('../models/comment');

exports.index = function (req, res) {
  console.log('user in session');  
  console.log(req.session.user);  
  Article.fetch(function(err,articles){
    Comment.fetch(function(err,comments){
      if (err) {
        console.log(err);
      }            
      res.render('index', {
        title: '主页',
        tag: 'index',
        article: articles,
        comment: comments
      });
    });
  }); 
}