const userModel=require("../apis/auth/userModel")
const bcrypt=require("bcrypt")
const adminreg=()=>{
    userModel.findOne({email:"admin@gmail.com"})
    .then((admindata)=>{
        if(admindata==null){
            //admin add
            let adminobj=new userModel()
            adminobj.name="admin"
            adminobj.email="admin@gmail.com"
            adminobj.password=bcrypt.hashSync("1234",10)
            adminobj.userType=1
            adminobj.save()
            .then(()=>{
                console.log("Admin addedd");
                
            })
            .catch(()=>{
                console.log("something went wrong while adding admin");
                
            })
        }
        else{
            console.log("Admin online");
            
        }
    })
    .catch(()=>{
        console.log("something went wrong");
        
    })
}

module.exports={adminreg}