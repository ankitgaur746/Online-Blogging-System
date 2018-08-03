var mongoose    =  require("mongoose") ;
var Blog  =  require("./models/blogs") ;
var Comment     =  require("./models/comments") ;

var data = [
             {name : "Cloud's rest" , 
              image : "https://farm4.staticflickr.com/3805/9667057875_90f0a0d00a.jpg" ,
              description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions ofLorem Ipsum."
                 
             } ,
             
             { name : "green woods" ,
               image : "https://farm4.staticflickr.com/3211/3062207412_03acc28b80.jpg" , 
               description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                 
             } ,
             
             { name : "thunder sky" ,
               image : "https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg" ,
               description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                 
             } 
             
             ] ;
function seedDb(){
    //remove blogs
    
    Blog.remove({} , function(err){
            if(err)
             console.log(err) ;
            else
             console.log("removed everything") ;
             
            //add a few blogs
                 data.forEach(function(seed){
                     Blog.create(seed , function(err , blog){
                         if(err)
                          console.log(err) ;
                         else
                          console.log("added a blog") ;
                          
                            //add comments
                            
                            Comment.create({
                                 text : "This place is great but I wish there was internet",
                                 author :"homer"
                            } ,   
                             function(err , comment){
                                 if(err)
                                  {
                                      console.log(err);
                                  }
                                  else{
                                     blog.comments.push(comment) ;
                                     blog.save() ;
                                     console.log("created comment") ;
                                  }
                                 
                             }) ;
                     });
                 });
           
        }) ;

}

module.exports = seedDb;