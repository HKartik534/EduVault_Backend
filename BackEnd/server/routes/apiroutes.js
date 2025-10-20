const routes=require("express").Router()
const courseController=require("../apis/course/courseController")
const bookController=require("../apis/book/bookController")
const semController=require("../apis/sem/semController")
const materialController=require("../apis/material/materialController")
const userController=require("../apis/auth/userController")

//course routes
routes.post("/course/add",courseController.add)
routes.post("/course/all",courseController.getall)
routes.post("/course/single",courseController.getsingle)
routes.post("/course/pagination",courseController.getpagination)
routes.post("/course/update",courseController.update)
routes.post("/course/status",courseController.changestatus)
routes.post("/course/delete",courseController.deleteOne)


//book routes
routes.post("/book/add",bookController.add)
routes.post("/book/all",bookController.getall)
routes.post("/book/single",bookController.getsingle)
routes.post("/book/pagination",bookController.getpagination)
routes.post("/book/update",bookController.update)
routes.post("/book/status",bookController.changestatus)
routes.post("/book/delete",bookController.deleteOne)

//sem routes
routes.post("/sem/add",semController.add)
routes.post("/sem/all",semController.getall)
routes.post("/sem/single",semController.getsingle)
routes.post("/sem/pagination",semController.getpagination)
routes.post("/sem/update",semController.update)
routes.post("/sem/status",semController.changestatus)
routes.post("/sem/delete",semController.deleteOne)




//material routes
routes.post("/material/add",materialController.add)
routes.post("/material/all",materialController.getall)
routes.post("/material/single",materialController.getsingle)
routes.post("/material/pagination",materialController.getpagination)
routes.post("/material/update",materialController.update)
routes.post("/material/status",materialController.changestatus)
routes.post("/material/delete",materialController.deleteOne)


//user routes
routes.post("/user/add",userController.register)
routes.post("/user/login",userController.login)




module.exports=routes