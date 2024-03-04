import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
  secure: true
});

export const uploadOnCloudinary = async (file) => {
  try {
    if (!file) return null;

    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(file, {
      folder: "linkbridge-images",
      resource_type: "auto"
    });

    return response;
  } catch (error) {
    console.log(`Error occured while uploading image to cloudinary: ${error}`);
    return null;
  }
};

export const deleteFromCloudinary = async publicId => {
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    return res;
  } catch (error) {
    console.log(`Error occured while deleting image from cloudinary: ${error}`);
  }
};

