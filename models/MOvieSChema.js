const mongoose=require("mongoose")


const movieSchema=mongoose.Schema({
    Title:{type:String,required:true},
    Release_Date:{type:String,required:true},
    Genre:{type:String,required:true},
    Cast:{type:[String],required:true},
    Director:{type:String,required:true}
})

const MovieModel=mongoose.model("movie",movieSchema)

module.exports=MovieModel