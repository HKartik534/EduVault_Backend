const courseModel=require("./courseModel")
const {uploadImg} = require("../../utilities/helper")
const add=(req,res)=>{
    var errMsg=[]
    if(!req.body.name){
        errMsg.push("Name is required")
    }
    if(!req.file){
        errMsg.push("file is required")
    }
    if(!req.body.description){
        errMsg.push("description is required")
    }
    if(errMsg.length>0){
        res.send({
            status:422,
            success:false,
            message:errMsg

        })
    }
    else{
        courseModel.findOne({name:req.body.name})
        .then(async(coursedata)=>{
            if(coursedata==null){
                 let courseobj=new courseModel()
                        courseobj.name=req.body.name
                        if(req.file){
                            try{
                                    // code try
                                let url =await uploadImg(req.file.buffer)
                                courseobj.image = url
                            }
                            catch(err){
                                res.send({
                                    status:400,
                                    success:false,
                                    message:err
                                })

                            }
                    }
                        // courseobj.image="course/"+req.file.filename
                        courseobj.description=req.body.description
                        courseobj.save()
                        .then((coursedata)=>{
                            res.send({
                                status:200,
                                success:true,
                                message:"Course added successfully",
                                data:coursedata
                            })
                        })
                        .catch((err)=>{
                            res.send({
                                status:500,
                                success:false,
                                message:err
                            })
                        })
            }
             else{
                res.send({
                    status:400,
                    success:false,
                    message:"course already exist"
                })
             }
        })
        .catch((err)=>{
            res.send({
                status:500,
                success:false,
                message:err
            })
        })
    }

}
const getall=(req,res)=>{
   courseModel.find()
    .then((bookdata)=>{
        if(bookdata==null){
            res.send({
                status:404,
                success:false,
                message:"course do not exist"
            })
        }
        else{
            res.send({
                status:200,
                success:true,
                message:"course data loaded successfully",
                data:bookdata
            })
        }
    })
    .catch((err)=>{
        res.send({
            status:500,
            success:false,
            message:err
        })
    })
}
const getsingle=(req,res)=>{
    courseModel.findOne({_id:req.body._id})
    .then((bookdata)=>{
        if(bookdata==null){
            res.send({
                status:404,
                success:false,
                message:"course so not exist"
            })
        }
        else{
            res.send({
                status:200,
                success:true,
                message:"course data loaded",
                data:bookdata
            })
        }
    })
    .catch((err)=>{
        res.send({
            status:500,
            success:false,
            message:err 
        })
    })
}
const getpagination=(req,res)=>{
    var errMsg=[]
    if(!req.body.pageno){
        errMsg.push("pageno is required")
    }
    if(!req.body.limit){
        errMsg.push("limit is required")
    }
    if(errMsg.length>0){
        res.send({
            status:404,
            success:false,
            message:errMsg
        })
    }
    else{
        var pageno=req.body.pageno
        var limit=req.body.limit
        var skip=0
        if(pageno>1){
             skip=(pageno-1)*limit
        }
        courseModel.find()
        .limit(limit)
        .skip(skip)
        .then((bookdata)=>{
            res.send({
                status:200,
                success:true,
                message:"course data loaded",
                data:bookdata
            })
        })
        .catch(()=>{
            res.send({
                status:500,
                success:false,
                message:"Something went wrong"
            })
        })
    }
}
const update=(req,res)=>{
    courseModel.findOne({_id:req.body._id})
    .then((bookdata)=>{
        if(req.body.name){
            bookdata.name=req.body.name
        }
        if(req.body.image){
            bookdata.image=req.body.image
        }
        
        if(req.body.description){
            bookdata.description=req.body.description
        }
        bookdata.save()
        .then((bookdata)=>{
            res.send({
                status:200,
                success:true,
                message:"data updated successfully",
                data:bookdata
            })
        })
        .catch(()=>{
            res.send({
            status:500,
            success:false,
            message:"something went wrong"
        })    
        })
    })
    .catch(()=>{
        res.send({
            status:500,
            success:false,
            message:"something went wrong"
        })
    })
}
const changestatus=(req,res)=>{
    courseModel.findOne({_id:req.body._id})
    .then((bookdata)=>{
        if(req.body.status){
            bookdata.status=req.body.status
        }
        bookdata.save()
        .then((bookdata)=>{
            res.send({
                status:200,
                success:true,
                message:"status changed successfully",
                data:bookdata
            })
        })
        .catch(()=>{
            res.send({
                status:500,
                success:false,
                message:"something went wrong"
            })
        })
    })
    .catch(()=>{
        res.send({
            status:500,
            success:false,
            message:"something went wrong"
        })
    })
}
const deleteOne=(req,res)=>{
    var errMsg=[]
    if(!req.body._id){
        errMsg.push("id is required")
    }
    if(errMsg.length>0){
        res.send({
            status:422,
            success:false,
            message:errMsg

        })
    }
    else{
         courseModel.findOne({_id:req.body._id})
         .then((bookdata)=>{
            if(bookdata==null){
                res.send({
                    status:404,
                    success:false,
                    message:"course do not exist"
                })
            }
            else{
                courseModel.deleteOne({_id:req.body._id})
                .then((bookdata)=>{
                    res.send({
                        status:200,
                        success:true,
                        message:"course deleted successfully"
                    })
                })
                .catch(()=>{
                    res.send({
                    status:500,
                    success:false,
                    message:"something went worng"
                    })
                })
            }
         })
         .catch(()=>{
            res.send({
                status:500,
                success:false,
                message:"something went worng"
            })
         })
    }
}


module.exports={add,getall,getsingle,getpagination,update,changestatus,deleteOne}