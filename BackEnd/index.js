const express=require("express")
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(__dirname+("./server/public/")))
const db=require("./server/config/db")
const seeder=require("./server/config/seeder")
seeder.adminreg()
const cors=require("cors")
app.use(cors())
const apiroutes = require("./server/routes/apiroutes")
const user=require("./server/routes/user")
app.use("/apis",apiroutes)
app.use("/user",user)
app.listen(5000,(err)=>{
    if(err!=null){
        console.log("Error while connecting databse",err);
    }
    else{
        console.log("Server connected",5000);
        
    }
})