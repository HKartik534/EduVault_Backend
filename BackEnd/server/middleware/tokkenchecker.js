const jwt=require("jsonwebtoken")
const key="123@#123"
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
                console.log("token is",token);
                next()
                
            }
        })
    }
}