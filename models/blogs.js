
var mongoose = require("mongoose") ;
//schema setup

var BlogSchema = new mongoose.Schema({
     name: String ,
     image: String ,
     description : String,
     author : {
         id :{
             type : mongoose.Schema.Types.ObjectId ,
             ref  : "User"
         } , 
         username : String
     },
     comments :[ 
                    {
                        type : mongoose.Schema.Types.ObjectId ,
                        ref  : "Comment"
                    } 
               ]
} , {usePushEach : true } ) ;

var Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog ;