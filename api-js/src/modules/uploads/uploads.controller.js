const service = require("./uploads.service");

class UploadController {
  constructor() {}

  uploadImage = async (req, res) => {
    const result = await service.uploadImage(req, res);
    res.json(result);
  };
}

module.exports = new UploadController();
