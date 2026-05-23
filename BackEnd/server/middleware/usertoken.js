const jwt=require("jsonwebtoken")
const key=process.env.JWTKEY
module.exports=(req,res,next)=>{
    var token=req.headers["authorization"]
    if(!token){
        res.send({
            status:403,
            success:false,
            message:"token not found"
        })
    }
    else{
        jwt.verify(token,key,function(err,data){
            if(err!=null){
                res.send({
                    status:403,
                    success:false,
                    message:"token do not match"
                })
            }
            else{
                if(data.userType==2){
                    next()
                }
                else{
                    res.send({
                        status:403,
                        success:false,
                        message:"Unauthorized user abc"
                    })
                }
            }
        })
    }
}