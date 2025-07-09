const repository = require("./permissions.repository");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/permission.validator");

class PermissionService {
  constructor() {
    this.repository = repository;
  }

  async create({ action, subject, description }) {
    const existingPermission = await repository.getByActionAndSubject(action, subject);
    if (existingPermission) throw new CustomError("Permissão ja cadastrada", 400);

    const validateData = validator.create({ action, subject, description });
    return repository.create(validateData);
  }

  getAll() {
    return repository.getAll();
  }

  getById(id) {
    return repository.getById(parseInt(id));
  }

  async update(id, { action, subject, description }) {
    const permission = await repository.getById(parseInt(id));
    if (!permission) throw new CustomError("Permissão nao encontrada", 404);

    const validateData = validator.update({ action, subject, description });
    return repository.update(permission.id, validateData);
  }

  async remove(id) {
    const permission = await repository.getById(parseInt(id));
    if (!permission) throw new CustomError("Permissão nao encontrada", 404);

    return repository.remove(permission.id);
  }
}

module.exports = new PermissionService();
