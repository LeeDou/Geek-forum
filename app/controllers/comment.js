var Comment = require('../models/comment');

exports.comlist=function(req,res){
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
  }	
};
