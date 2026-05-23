const {ImageKit}=require('@imagekit/nodejs')
const ImageKitClient= new ImageKit({
    privateKey:process.env.PRIVATEKEY
})

async function uploadImg(file) {
    const result=await ImageKitClient.files.upload({
        file:file.toString("base64"),
        fileName:"academiaHive_"+Date.now(),
        folder:"AcademiaHive"

    })

    return result
    
}

module.exports=uploadImg