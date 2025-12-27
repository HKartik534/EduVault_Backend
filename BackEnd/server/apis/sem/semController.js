const semModel=require("./semModel")
const add=(req,res)=>{
    var errMsg=[]
    if(!req.body.name){
        errMsg.push("Name is required")
    }
    if(!req.body.description){
        errMsg.push("description is required")
    }
    if(!req.body.courseId){
        errMsg.push("courseId is required")
    }
    if(errMsg.length>0){
        res.send({
            status:422,
            success:false,
            message:errMsg

        })
    }
    else{
        semModel.findOne({name:req.body.name})
        .then((semdata)=>{
            if(semdata==null){
                 let semobj=new semModel()
                        semobj.name=req.body.name
                        semobj.description=req.body.description
                        semobj.courseId=req.body.courseId
                        semobj.save()
                        .then((semdata)=>{
                            res.send({
                                status:200,
                                success:true,
                                message:"sem added successfully"
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
                    message:"sem already exist"
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
    semModel.find()
    .populate("courseId")
    .then((bookdata)=>{
        if(bookdata==null){
            res.send({
                status:404,
                success:false,
                message:"sem do not exist"
            })
        }
        else{
            res.send({
                status:200,
                success:true,
                message:"sem data loaded successfully",
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
    semModel.findOne({_id:req.body._id})
    .populate("courseId")
    .then((bookdata)=>{
        if(bookdata==null){
            res.send({
                status:404,
                success:false,
                message:"sem so not exist"
            })
        }
        else{
            res.send({
                status:200,
                success:true,
                message:"sem data loaded",
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
        semModel.find()
        .limit(limit)
        .skip(skip)
        .then((bookdata)=>{
            res.send({
                status:200,
                success:true,
                message:"sem data loaded",
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
    semModel.findOne({_id:req.body._id})
    .then((bookdata)=>{
        if(req.body.courseId){
            bookdata.courseId=req.body.courseId
        }
        if(req.body.name){
            bookdata.name=req.body.name
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
    semModel.findOne({_id:req.body._id})
    .then((bookdata)=>{
       bookdata.status=!bookdata.status
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
         semModel.findOne({_id:req.body._id})
         .then((bookdata)=>{
            if(bookdata==null){
                res.send({
                    status:404,
                    success:false,
                    message:"sem do not exist"
                })
            }
            else{
                semModel.deleteOne({_id:req.body._id})
                .then((bookdata)=>{
                    res.send({
                        status:200,
                        success:true,
                        message:"sem deleted successfully"
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