const routes=require("express").Router()
const multer=require("multer")
const storage=multer.memoryStorage()
const upload =multer({storage:storage})
const courseController=require("../apis/course/courseController")
const bookController=require("../apis/book/bookController")
const semController=require("../apis/sem/semController")
const materialController=require("../apis/material/materialController")
const userController=require("../apis/auth/userController")
const enquiryController=require("../apis/enquiry/enquiryController")

//auth routes
routes.post("/user/add",userController.register)
routes.post("/user/login",userController.login)

//token routes
routes.use(require("../middleware/usertoken"))

//course routes
routes.post("/course/user/all",courseController.getall)
routes.post("/course/single",courseController.getsingle)
routes.post("/course/pagination",courseController.getpagination)

//book routes
routes.post("/book/add",upload.single("image"),bookController.add)
routes.post("/book/all",bookController.getall)
routes.post("/book/single",bookController.getsingle)
routes.post("/book/pagination",bookController.getpagination)
routes.post("/book/update",upload.single("image"),bookController.update)

//sem routes
routes.post("/sem/all",semController.getall)
routes.post("/sem/single",semController.getsingle)
routes.post("/sem/pagination",semController.getpagination)

//material routes
routes.post("/material/add",upload.single("image"),materialController.add)
routes.post("/material/all",materialController.getall)
routes.post("/material/single",materialController.getsingle)
routes.post("/material/pagination",materialController.getpagination)
routes.post("/material/update",materialController.update)

//user routes
routes.post("/user/changepassword",userController.changepassword)

//enquiry routes
routes.post("enquiry/add",enquiryController.add)
routes.post("enquiry/update",enquiryController.update)


module.exports=routes