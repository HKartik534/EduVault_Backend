const mongoose=require("mongoose")
const semSchema= new mongoose.Schema({
    courseId:{type:mongoose.Schema.Types.ObjectId,ref:"courses"},
    name:{type:String,default:""},
    description:{type:String,default:""},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
    
})

module.exports=new mongoose.model("sems",semSchema)