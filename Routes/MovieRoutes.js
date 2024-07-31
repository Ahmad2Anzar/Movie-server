const express=require("express")
const MovieModel = require("../models/MOvieSChema");

const MovieRouter=express.Router()

MovieRouter.post("/create-movie",async (req,res)=>{
  
    if(Array.isArray(req.body)){
    try {
        await MovieModel.insertMany(req.body)
        res.send('MOvie added')
    } catch (error) {
       res.send(error)
    }
   }
   else{
    const{Title,Release_Date,Genre,Cast,Director}=req.body
    try {
        const singleMovie=new MovieModel({
            Title,
            Release_Date,
            Genre,
            Cast,
            Director
        })
        singleMovie.save()
        res.send(singleMovie)
    } catch (error) {
        res.send(error)
    }
}    
})

MovieRouter.patch("/update-movie/:id",async (req,res)=>{
const{id}=req.params
try {
    const updatedMovie=await MovieModel.findByIdAndUpdate({_id:id},req.body)
    res.send(updatedMovie)
} catch (error) {
    res.send(error)
}
})

MovieRouter.delete("/delete-movie/:id",async(req,res)=>{
    const{id}=req.params
    console.log("hi")
    try {
       const Deletedmovie= await MovieModel.findByIdAndDelete({_id:id})
        res.send(Deletedmovie)
    } catch (error) {
        res.send(error)
    }
})

MovieRouter.get("/get-movie",async(req,res)=>{
   try {
    const{q,qt,sortby,order,page=1,limit=10}=req.query
    order = order==='asc'?1:-1
    let query={}
    if(q&&qt){
        query.qt={$regex:q,$options:'i'}
    }
    let filteredMovie=await MovieModel.find(query).
    sort({[sortby]:order}).
    skip((page-1)*limit).
    limit(limit)
    
    res.send(filteredMovie)

   } catch (error) {
    
   }
})


module.exports=MovieRouter