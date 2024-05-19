import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

async function uploadFile(file) {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } catch (err) {
    console.error("Error uploading file:", err);
    return {
      status: "Error",
      message: "Error uploading file",
    };
  }
}
export default uploadFile;
