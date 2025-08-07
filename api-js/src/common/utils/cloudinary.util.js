const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    uploadStream.end(buffer);
  });
}

async function deleteImage(publicId) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Erro ao deletar imagem da Cloudinary:", error);
    throw new Error("Falha ao deletar a imagem.");
  }
}

function getPublicIdFromUrl(url) {
  const parts = url.split("/");
  const filename = parts.pop();
  const publicId = filename.split(".")[0];
  return publicId;
}

module.exports = { cloudinary, uploadToCloudinary, deleteImage, getPublicIdFromUrl };
