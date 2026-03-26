const mongoose=require("mongoose")
const bookSchema= new mongoose.Schema({
    courseId:{type:mongoose.Schema.Types.ObjectId,ref:"courses"},
    semId:{type:mongoose.Schema.Types.ObjectId,ref:"sems"},
    name:{type:String,default:""},
    type:{type:String,default:""},
    image:{type:String,default:"noimage.jpg"},
    bookFile:{type:String,default:""},
    price:{type:String,default:""},
    description:{type:String,default:""},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
    
})

module.exports=new mongoose.model("books",bookSchema)