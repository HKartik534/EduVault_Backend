const userModel=require("./userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const key="123@#123"
var salt=10
const register=(req,res)=>{
    var errMsg=[]
    if(!req.body.name){
        errMsg.push("name is required")
    }
    if(!req.body.email){
        errMsg.push("email is required")
    }
    if(!req.body.password){
        errMsg.push("password is required")
    }
    if(!req.body.contact){
        errMsg.push("contact is required")
    }if(!req.body.address){
        errMsg.push("address is required")
    }
    if(errMsg.length>0){
        res.send({
            status:422,
            success:false,
            message:errMsg
        })
    }
    else{
        userModel.findOne({email:req.body.email})
        .then((userdata)=>{
            if(userdata==null){
                //add user
                let userobj=new userModel()
                userobj.name=req.body.name
                userobj.email=req.body.email
                userobj.password=bcrypt.hashSync(req.body.password,salt)
                userobj.userType=2
                userobj.contact=req.body.contact
                userobj.address=req.body.address
                userobj.save()
                .then((userdata)=>{
                    res.send({
                        status:200,
                        success:true,
                        message:"user added successfully"
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
            else{
                res.send({
                    status:404,
                    success:false,
                    message:"email already exist"
                })
            }
        })
        .catch(()=>{
            res.send({
                status:500,
                success:false,
                message:"something went wrong"
            })
        })
    }

}
const login=(req,res)=>{
    var errMsg=[]
    if(!req.body.email){
        errMsg.push("email is required")
    }
    if(!req.body.password){
        errMsg.push("password is required")
    }
    if(errMsg.length>0){
        res.send({
            status:422,
            success:false,
            message:errMsg
        })
    }
    else{
        userModel.findOne({email:req.body.email})
        .then((userdata)=>{
            if(userdata==null){
                res.send({
                    status:404,
                    success:false,
                    message:"user do not exist"
                })
            }
            else{
                bcrypt.compare(req.body.password,userdata.password,function(err,isMatch){
                    if(!isMatch){
                        res.send({
                            status:403,
                            success:false,
                            message:"invalid password"
                        })
                    }
                    else{
                        let payload={
                            _id:userdata._id,
                            name:userdata.name,
                            email:userdata.email,
                            address:userdata.address,
                            contact:userdata.contact,
                            userType:userdata.userType
                        }
                        let token=jwt.sign(payload,key)
                        res.send({
                            status:200,
                            success:true,
                            message:"Login successfull",
                            token
                        })
                    }
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

module.exports={register,login}