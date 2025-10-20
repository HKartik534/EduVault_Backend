const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/projectDatabase")
.then(()=>{
    console.log("Database connected");   
})
.catch((err)=>{
    console.log("Error while connecting database",err);  
})