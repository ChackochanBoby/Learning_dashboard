const { cloudinaryInstance } = require("../config/cloudinary");

const handleImageUpload = async (path) => {
  try {
    const uploadResult = await cloudinaryInstance.uploader.upload(path);
    return uploadResult.url;
  } catch (error) {
    throw new Error("Image upload failed");
  }
};

module.exports = { handleImageUpload };
