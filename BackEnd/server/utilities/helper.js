const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "dnxng3fkk",  // your cloud name
    api_key: "556518375473155",
    api_secret: "THQsO5nzseivrfLd41DqOJTBSR0",
    secure: true,
    cdn_subdomain: true,
});


const uploadImg = async (fileBuffer, publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                public_id: publicId,
                resource_type: "auto"},
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        ).end(fileBuffer);
    });
};




module.exports = {uploadImg}