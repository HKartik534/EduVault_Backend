const enquiryModel=require("./enquiryModel")
const add=(req,res)=>{
    var errMsg=[]
    if(!req.body.name){
        errMsg.push("Name is required")
    }
    if(!req.body.email){
        errMsg.push("email is required")
    }
    if(!req.body.contact){
        errMsg.push("contact is required")
    }
    if(!req.body.subject){
        errMsg.push("subject is required")
    }
    if(!req.body.message){
        errMsg.push("message is required")
    }
    if(errMsg.length>0){
        res.send({
            status:422,
            success:false,
            message:errMsg
        })
    }
    else{
        enquiryModel.findOne({email:req.body.email})
        .then((bookdata)=>{
            if(bookdata==null){
                 let bookobj=new enquiryModel()
                        bookobj.name=req.body.name
                        bookobj.email=req.body.email
                        bookobj.contact=req.body.contact
                        bookobj.subject=req.body.subject
                        bookobj.message=req.body.message
                        bookobj.save()
                        .then((bookdata)=>{
                            res.send({
                                status:200,
                                success:true,
                                message:"enquiry added successfully"
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
                    message:"enquiry already exist"
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
//update and change status
const update=(req,res)=>{
    enquiryModel.findOne({_id:req.body._id})
    .then((bookdata)=>{
        if(req.body.name){
            bookdata.name=req.body.name
        }
        if(req.body.email){
            bookdata.email=req.body.email
        }
        if(req.body.contact){
            bookdata.contact=req.body.contact
        }
        if(req.body.subject){
            bookdata.subject=req.body.subject
        }
        if(req.body.message){
            bookdata.message=req.body.message
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
    enquiryModel.findOne({_id:req.body._id})
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

module.exports={add,update,changestatus}