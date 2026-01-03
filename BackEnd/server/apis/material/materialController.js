const { uploadImg } = require("../../utilities/helper")
const materialModel = require("./materialModel")
const add = (req, res) => {
    var errMsg = []
    if (!req.body.title) {
        errMsg.push("title is required")
    }
    if (!req.file) {
        errMsg.push("attachment is required")
    }
    if (!req.body.description) {
        errMsg.push("description is required")
    }
    if (!req.body.courseId) {
        errMsg.push("courseId is required")
    }
    if (!req.body.semId) {
        errMsg.push("semId is required")
    }
    if (errMsg.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: errMsg
        })
    }
    else {
        materialModel.findOne({ title: req.body.title })
            .then(async (coursedata) => {
                if (coursedata == null) {
                    let materialobj = new materialModel()
                    materialobj.title = req.body.title
                    materialobj.courseId = req.body.courseId
                    materialobj.semId = req.body.semId
                    if (req.file) {
                        try {
                            // code try
                            let url = await uploadImg(req.file.buffer)
                            materialobj.attachment = url
                        }
                        catch (err) {
                            res.send({
                                status: 400,
                                success: false,
                                message: err
                            })

                        }
                    }
                    //    materialobj.attachment="material/"+req.file.filename
                    materialobj.description = req.body.description
                    materialobj.type=req.body.type
                    materialobj.save()
                        .then((coursedata) => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Material added successfully"
                            })
                        })
                        .catch((err) => {
                            res.send({
                                status: 500,
                                success: false,
                                message: err
                            })
                        })
                }
                else {
                    res.send({
                        status: 400,
                        success: false,
                        message: "Material already exist"
                    })
                }
            })
            .catch((err) => {
                res.send({
                    status: 500,
                    success: false,
                    message: err
                })
            })
    }

}
const getall = (req, res) => {
    materialModel.find(req.body)
        .then((bookdata) => {
            if (bookdata == null) {
                res.send({
                    status: 404,
                    success: false,
                    message: "material do not exist"
                })
            }
            else {
                res.send({
                    status: 200,
                    success: true,
                    message: "material data loaded successfully",
                    data: bookdata
                })
            }
        })
        .catch((err) => {
            res.send({
                status: 500,
                success: false,
                message: err
            })
        })
}
const getsingle = (req, res) => {
    materialModel.findOne({ _id: req.body._id })
        .then((bookdata) => {
            if (bookdata == null) {
                res.send({
                    status: 404,
                    success: false,
                    message: "material so not exist"
                })
            }
            else {
                res.send({
                    status: 200,
                    success: true,
                    message: "material data loaded",
                    data: bookdata
                })
            }
        })
        .catch((err) => {
            res.send({
                status: 500,
                success: false,
                message: err
            })
        })
}
const getpagination = (req, res) => {
    var errMsg = []
    if (!req.body.pageno) {
        errMsg.push("pageno is required")
    }
    if (!req.body.limit) {
        errMsg.push("limit is required")
    }
    if (errMsg.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: errMsg
        })
    }
    else {
        var pageno = req.body.pageno
        var limit = req.body.limit
        var skip = 0
        if (pageno > 1) {
            skip = (pageno - 1) * limit
        }
        materialModel.find()
            .limit(limit)
            .skip(skip)
            .then((bookdata) => {
                res.send({
                    status: 200,
                    success: true,
                    message: "material data loaded",
                    data: bookdata
                })
            })
            .catch(() => {
                res.send({
                    status: 500,
                    success: false,
                    message: "Something went wrong"
                })
            })
    }
}
const update = (req, res) => {
    materialModel.findOne({ _id: req.body._id })
        .then(async (bookdata) => {
            if (req.body.title) {
                bookdata.title = req.body.title
            }
            if (req.body.description) {
                bookdata.description = req.body.description
            }
            if (req.body.type) {
                bookdata.type = req.body.type
            }
            if (req.body.courseId) {
                bookdata.courseId = req.body.courseId
            }
            if (req.body.semId) {
                bookdata.semId = req.body.semId
            }
            if (req.file) {
                try {
                    // code try
                    let url = await uploadImg(req.file.buffer)
                    bookdata.attachment = url
                }
                catch (err) {
                    res.send({
                        status: 400,
                        success: false,
                        message: err
                    })

                }
            }
            bookdata.save()
                .then((bookdata) => {
                    res.send({
                        status: 200,
                        success: true,
                        message: "data updated successfully",
                        data: bookdata
                    })
                })
                .catch(() => {
                    res.send({
                        status: 500,
                        success: false,
                        message: "something went wrong"
                    })
                })
        })
        .catch((err) => {
            res.send({
                status: 500,
                success: false,
                message: "something went wrong",
                err
            })
        })
}
const changestatus = (req, res) => {
    materialModel.findOne({ _id: req.body._id })
        .then((bookdata) => {
            bookdata.status = !bookdata.status
            bookdata.save()
                .then((bookdata) => {
                    res.send({
                        status: 200,
                        success: true,
                        message: "status changed successfully",
                        data: bookdata
                    })
                })
                .catch(() => {
                    res.send({
                        status: 500,
                        success: false,
                        message: "something went wrong"
                    })
                })
        })
        .catch(() => {
            res.send({
                status: 500,
                success: false,
                message: "something went wrong"
            })
        })
}
const deleteOne = (req, res) => {
    var errMsg = []
    if (!req.body._id) {
        errMsg.push("id is required")
    }
    if (errMsg.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: errMsg

        })
    }
    else {
        materialModel.findOne({ _id: req.body._id })
            .then((bookdata) => {
                if (bookdata == null) {
                    res.send({
                        status: 404,
                        success: false,
                        message: "material do not exist"
                    })
                }
                else {
                    materialModel.deleteOne({ _id: req.body._id })
                        .then((bookdata) => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "material deleted successfully"
                            })
                        })
                        .catch(() => {
                            res.send({
                                status: 500,
                                success: false,
                                message: "something went worng"
                            })
                        })
                }
            })
            .catch(() => {
                res.send({
                    status: 500,
                    success: false,
                    message: "something went worng"
                })
            })
    }
}

module.exports = { add, getall, getsingle, getpagination, update, changestatus, deleteOne }