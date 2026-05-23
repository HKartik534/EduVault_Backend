const mongoose=require("mongoose")
mongoose.connect(process.env.MONGOBDURL)
.then(()=>{
    console.log("Database connected");   
})
.catch((err)=>{
    console.log("Error while connecting database",err);  
})
