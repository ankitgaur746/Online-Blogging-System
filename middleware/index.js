var Blog = require("../models/blogs.js") ;
var Comment = require("../models/comments.js") ;
//all middleware goes here

var middlewareObj = {};

middlewareObj.checkBlogOwnership = function(req,res,next){
     if(req.isAuthenticated()){
           Blog.findById(req.params.id , function(err , foundBlog){
              if(err)
              {   
                  req.flash("error" , " Blog not found ") ;
                  res.redirect("back") ;
              }
              else{
                  if(foundBlog.author.id.equals(req.user._id) )   //cannot do comparison with == or === as one is a mongodb object while other is string
                    { 
                      next() ;
                    }
                  else{
                      req.flash("error" , "You dont have permission to do that ") ; 
                      res.redirect("back") ;
                  }
              }
           }) ;
      }else{
        req.flash("error" , "You need to be logged in to do that") ;
        res.redirect("back") ;
      }
     
 } ;
 
 middlewareObj.isLoggedIn = function(req , res ,next){
     if(req.isAuthenticated() )
     {
         return next() ;
     }
     req.flash("error" , "You need to be logged in to do that") ; // it should be before redirection
     res.redirect("/login") ;
 } ;
 
middlewareObj.checkCommentOwnership =  function(req,res,next) {
     if(req.isAuthenticated()){
           Comment.findById(req.params.comment_id , function(err , foundComment){
              if(err)
              {
                  req.flash("error","An error occured") ;
                  res.redirect("back") ;
              }
              else{
                  if(foundComment.author.id.equals(req.user._id) )   //cannot do comparison with == or === as one is a mongodb object while other is string
                    { 
                      next() ;
                    }
                  else{
                      req.flash("error","you dont have permission to do that") ;
                      res.redirect("back") ;
                  }
              }
           }) ;
      }else{
        res.redirect("back") ;
      }
     
} ;
 
 module.exports = middlewareObj ;