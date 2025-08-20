const CustomError = require("../../common/utils/CustomError");
const upload = require("../../common/middlewares/multer.middleware");
const { uploadToCloudinary } = require("../../common/utils/cloudinary.util");

const ALLOWED_FOLDERS = ["ecommerce/products", "ecommerce/banners", "users/avatars"];

class UploadService {
  constructor() {}

  uploadImage = async (req, res) => {
    return new Promise((resolve, reject) => {
      const uploader = req.query.single === "true" ? upload.single("file") : upload.array("files");

      uploader(req, res, async (err) => {
        try {
          if (err) return reject(new CustomError(err.message, 400));

          const { folder, maxImages } = req.body;
          const files = req.file ? [req.file] : req.files || [];

          if (!ALLOWED_FOLDERS.includes(folder)) {
            return reject(new CustomError("Pasta de destino inválida.", 400));
          }

          if (files.length === 0) {
            return reject(new CustomError("Nenhuma imagem enviada.", 400));
          }

          const maxAllowed = parseInt(maxImages) || 5;
          if (files.length > maxAllowed) {
            return reject(new CustomError(`Máximo de ${maxAllowed} imagens permitido.`));
          }

          const uploadResults = await Promise.all(
            files.map((file) =>
              uploadToCloudinary(file.buffer, {
                folder,
                transformation: [{ width: 800, height: 800, crop: "limit" }, { quality: "auto" }],
              })
            )
          );

          const formatted = uploadResults.map((result) => ({
            url: result.secure_url,
            alt: result.original_filename,
          }));

          resolve(formatted);
        } catch (error) {
          reject(new CustomError(error.message, 400));
        }
      });
    });
  };
}

module.exports = new UploadService();
