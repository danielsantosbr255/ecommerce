const User = require("../_app/models/User");
const jwt = require("jsonwebtoken");
const CustomError = require("../_app/utils/CustomError");

const generateToken = (id, role = "user") => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

class UserService {
    static create = async (name, email, password) => {
        const existUser = await User.findOne({ email });

        if (existUser) {
            throw new CustomError("Este usuário já existe.", 403);
        }

        const user = await User.create({ name, email, password });

        return { message: "Usuário criado com sucesso", token: generateToken(user._id, user.role) };
    };

    static signIn = async (email, password) => {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            return { message: "Login bem sucedido", token: generateToken(user._id, user.role) };
        } else {
            throw new CustomError("Credenciais inválidas", 403);
        }
    };

    static update = async (id, name, email, password) => {
        if (!name && !email && !password) {
            throw new CustomError("Nenhum campo para atualização foi fornecido.", 400);
        }

        const user = await User.findById(id);
        if (!user) {
            throw new CustomError("Usuário não encontrado", 404);
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;

        await user.save();
        return { message: "Usuário atualizado com sucesso", user };
    };

    static remove = async (id) => {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new CustomError("Usuário não encontrado", 404);
        }
        return { message: "Usuário excluído com sucesso!" };
    };

    static getById = async (id) => {
        const user = await User.findById(id).select("-password");
        if (!user) {
            throw new CustomError("Usuário não encontrado", 404);
        }
        return { user };
    };
}

module.exports = UserService;
