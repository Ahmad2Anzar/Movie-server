const express=require("express")
const mongoose=require("mongoose")
const connection = require("./configuration/db")
const MovieRouter = require("./Routes/MovieRoutes")


const server=express()
const PORT=8001

server.use(express.json())
server.use("/movie",MovieRouter)
server.get("/",(req,res)=>{
    res.send("this is home page")
})

server.listen(PORT,async ()=>{
    try {
       await connection
        console.log("connected to database")
    } catch (error) {
        console.log(error)
    }
    // console.log("sever is running on port 8001")
})
