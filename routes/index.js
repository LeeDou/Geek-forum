var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Article = require('../app/controllers/article');
var Comment = require('../app/controllers/comment');

module.exports = function(app){  
  app.use(function(req,res,next){
    var _user = req.session.user;
    app.locals.user=_user;       
    next();
  });
  function siginRequired(req,res,next){
    var user = req.session.user;
    if (!user) {
      return res.redirect('/signin');
    }
    next();
  } 
  // 首页
  app.get('/',Index.index);
 
  // 用户
  app.get('/register',User.register);
  app.post('/admin/signup',User.signup);
  app.get('/signin',User.signin);
  app.post('/admin/signin',User.sign);
  app.get('/signout',User.signout);

  // 文章
  app.get('/display',siginRequired,Article.display);
  app.delete('/admin/delarticle',siginRequired,Article.del);  
  app.post('/admin/displayArticle',siginRequired,Article.add); 
  app.get('/articleDetail/article',siginRequired,Article.detail);
  app.delete('/admin/article',Article.delat);

  // 评论
  app.post('/admin/commentlist',siginRequired,Comment.comlist);
};


