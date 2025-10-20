const express=require("express")
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const apiroutes = require("./server/routes/apiroutes")
app.use("/apis",apiroutes)
const db=require("./server/config/db")
const seeder=require("./server/config/seeder")
seeder.adminreg()
app.listen(5000,(err)=>{
    if(err!=null){
        console.log("Error while connecting databse",err);
    }
    else{
        console.log("Server connected",5000);
        
    }
})