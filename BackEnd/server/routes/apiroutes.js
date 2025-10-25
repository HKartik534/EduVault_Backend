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

// //multer code 
// const coursestorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './server/public/course')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
//   }
// })

// const courseupload = multer({ storage: coursestorage })

//course routes
routes.post("/course/add",upload.single("image"),courseController.add)
routes.post("/course/all",courseController.getall)
routes.post("/course/single",courseController.getsingle)
routes.post("/course/pagination",courseController.getpagination)
routes.post("/course/update",courseController.update)
routes.post("/course/status",courseController.changestatus)
routes.post("/course/delete",courseController.deleteOne)

// //multer code 
// const bookstorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './server/public/book')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
//   }
// })

// const bookupload = multer({ storage: bookstorage })

//book routes
// routes.post("/book/add",bookupload.single("image"),bookController.add)
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



//multer code
// const materialestorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './server/public/materiale')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
//   }
// })

// const materialeupload = multer({ storage: materialestorage })


//material routes
// routes.post("/material/add",materialeupload.single("image"),materialController.add)
routes.post("/material/all",materialController.getall)
routes.post("/material/single",materialController.getsingle)
routes.post("/material/pagination",materialController.getpagination)
routes.post("/material/update",materialController.update)
routes.post("/material/status",materialController.changestatus)
routes.post("/material/delete",materialController.deleteOne)


//user routes
routes.post("/user/add",userController.register)
routes.post("/user/login",userController.login)

//enquiry routes
routes.post("enquiry/add",enquiryController.add)
routes.post("enquiry/update",enquiryController.update)
routes.post("enquiry/status",enquiryController.changestatus)



// token routes
// routes.use(require("../middleware/tokkenchecker"))





module.exports=routes