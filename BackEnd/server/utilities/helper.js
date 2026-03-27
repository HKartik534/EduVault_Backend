const {ImageKit}=require('@imagekit/nodejs')
const ImageKitClient= new ImageKit({
    privateKey:"private_2LYutuWFU9nv5IX5DU81A1qn2xQ="
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