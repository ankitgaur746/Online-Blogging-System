var express = require("express") ;
var router  = express.Router({mergeParams : true} ) ;
var Blog = require("../models/blogs.js");
var methodOverride = require("method-override");
var Comment  = require("../models/comments.js");
var middleware = require("../middleware");


router.use(methodOverride("_method")) ;
//index route
//------------------------------------------------
router.get("/",function(req,res){
   //get all blogs from DB
   Blog.find({} , function(err , allBlogs){
       if(err){
           console.log(err) ;
       }
       else{
            res.render("blogs/index" , {blogs : allBlogs } );
       }
   }) ;
   
} );
//-----------------------------------------------------



//create route
//-----------------------------------------------------
router.post("/" ,middleware.isLoggedIn ,function(req , res)
{

     var name = req.body.name ;
     var image = req.body.image ;

     var desc = req.body.description;
     var author = {
        id       : req.user._id ,
        username : req.user.username 
     };
     var newBlog = { name: name , image: image , description : desc , author:author , } ;
     
     Blog.create(newBlog , function(err , newlyCreated){
         if(err)
         {
             console.log(err) ;
         }
         else
         {
             console.log(newlyCreated) ;
             req.flash("success","You successfully created new post") ;
             res.redirect("/blogs");
         } 
     }) ;
    
     
}) ;
//-----------------------------------------------------------



//new route
//-----------------------------------------------------------
router.get("/new",middleware.isLoggedIn,function(req,res){
 res.render("blogs/new") ;    
});

//-----------------------------------------------------------



//show route
//-----------------------------------------------------------
router.get("/:id",function(req ,res){
    Blog.findById(req.params.id).populate("comments").exec(function(err,foundBlog){
        if(err){
          console.log(err) ;
           }
         else{
          console.log(foundBlog) ;
          res.render("blogs/show" , {blog : foundBlog}) ;
         }
    }) ;
});
//-------------------------------------------------------------



//edit blog route
  router.get("/:id/edit",middleware.checkBlogOwnership,function(req,res){
      Blog.findById(req.params.id , function(err , foundBlog){
          if(err)
           {
               console.log(err) ;
               res.redirect("back") ;
           }
           else{
             
             res.render("blogs/edit" , {blog : foundBlog } ) ;
           }
      });
               
     
  });

//-------------------------------------------------------------


//update blog route
 router.put("/:id",middleware.checkBlogOwnership,function(req,res){
    Blog.findByIdAndUpdate(req.params.id , req.body.blog , function(err , updatedBlog){
        if(err){
            console.log(err) ;
            res.redirect("/blogs") ;
        }
        else{
            req.flash("success","You successfully updated Your blog") ;
            res.redirect("/blogs/" + req.params.id ) ;
        }
    }) ;
 });  

//-----------------------------------------------------

//delete blog route

router.delete("/:id",middleware.checkBlogOwnership,function(req,res){
    Blog.findByIdAndRemove(req.params.id , function(err){
      if(err)
      {
          res.redirect("/blogs") ;
      }
      else{
         req.flash("success","Your Blog successfully removed") ;
         res.redirect("/blogs") ; 
      }
    });
});

//-------------------------------------------------------

 
 
module.exports = router ;

