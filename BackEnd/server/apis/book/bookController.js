const { uploadImg } = require("../../utilities/helper")
const bookModel=require("./bookModel")
const add=(req,res)=>{
    var errMsg=[]
    if(!req.body.name){
        errMsg.push("Name is required")
    }
    if(!req.body.description){
        errMsg.push("description is required")
    }
    if(!req.body.price){
        errMsg.push("price is required")
    }
    if(!req.body.courseId){
        errMsg.push("courseId is required")
    }
    if(!req.body.semId){
        errMsg.push("semId is required")
    }
    if(errMsg.length>0){
        res.send({
            status:422,
            success:false,
            message:errMsg

        })
    }
    else{
        bookModel.findOne({name:req.body.name})
        .then(async(bookdata)=>{
            if(bookdata==null){
                 let bookobj=new bookModel()
                        bookobj.name=req.body.name
                        bookobj.price=req.body.price
                        bookobj.description=req.body.description
                        bookobj.type=req.body.type
                        bookobj.courseId=req.body.courseId
                        bookobj.semId=req.body.semId
                        // bookobj.image="book/"+req.file.filename
                         if(req.file){
                            try{
                                    // code try
                                let url =await uploadImg(req.file.buffer)
                                bookobj.image = url
                            }
                            catch(err){
                                console.log(err);
                                
                                res.send({
                                    status:400,
                                    success:false,
                                    message:err
                                })

                            }
                    }
                        bookobj.save()
                        .then((bookdata)=>{
                            res.send({
                                status:200,
                                success:true,
                                message:"book added successfully"
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
                    message:"book already exist"
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
    bookModel.find(req.body)
    .populate("courseId")
    .populate("semId")
    .then((bookdata)=>{
        if(bookdata==null){
            res.send({
                status:404,
                success:false,
                message:"books do not exist"
            })
        }
        else{
            res.send({
                status:200,
                success:true,
                message:"books data loaded successfully",
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
    bookModel.findOne({_id:req.body._id})
    .populate("courseId")
    .populate("semId")
    .then((bookdata)=>{
        if(bookdata==null){
            res.send({
                status:404,
                success:false,
                message:"book so not exist"
            })
        }
        else{
            res.send({
                status:200,
                success:true,
                message:"book data loaded",
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
        bookModel.find()
        .limit(limit)
        .skip(skip)
        .then((bookdata)=>{
            res.send({
                status:200,
                success:true,
                message:"book data loaded",
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
    bookModel.findOne({_id:req.body._id})
    .then(async(bookdata)=>{
        if(req.body.courseId){
            bookdata.courseId=req.body.courseId
        }
        if(req.body.semId){
            bookdata.semId=req.body.semId
        }
        if(req.body.name){
            bookdata.name=req.body.name
        }
        if(req.body.type){
            bookdata.type=req.body.type
        }
        if(req.body.price){
            bookdata.price=req.body.price
        }
        if(req.body.description){
            bookdata.description=req.body.description
        }
         if(req.body.image){
            try{
                                    // code try
                                let url =await uploadImg(req.file.buffer)
                                bookobj.image = url
                            }
                            catch(err){
                                res.send({
                                    status:400,
                                    success:false,
                                    message:err
                                })

                            }
            
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
    bookModel.findOne({_id:req.body._id})
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
         bookModel.findOne({_id:req.body._id})
         .then((bookdata)=>{
            if(bookdata==null){
                res.send({
                    status:404,
                    success:false,
                    message:"book do not exist"
                })
            }
            else{
                bookModel.deleteOne({_id:req.body._id})
                .then((bookdata)=>{
                    res.send({
                        status:200,
                        success:true,
                        message:"book deleted successfully"
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