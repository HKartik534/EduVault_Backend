const mongoose=require("mongoose")
const materialSchema= new mongoose.Schema({
    title:{type:String,default:""},
    attachment:{type:String,default:""},
    description:{type:String,default:""},
    type:{type:String,default:""},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
    
})

module.exports=new mongoose.model("materials",materialSchema)