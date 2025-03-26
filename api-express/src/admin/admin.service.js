const User = require("../_app/models/User");
const jwt = require("jsonwebtoken");
const CustomError = require("../_app/utils/CustomError");

class AdminService {
    static generateToken(id, role = false) {
        return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    }

    static getUsers = async () => {
        const users = await User.find({});
        return users;
    };

    static getUserById = async (id) => {
        const user = await User.findById(id);
        console.log(user);
        if (!user) {
            throw new CustomError("Usuário não encontrado", 404);
        }
        return user;
    };

    static createUser = async ({ name, email, password, role = false }) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new CustomError("Email já cadastrado.", 400);
        }
        const user = await User.create({ name, email, password, role });
        return { message: "Usuário criado com sucesso", token: generateToken(user._id, user.role) };
    };

    static updateUser = async (id, { name, email, password, role }) => {
        if (!name && !email && !password && !role) {
            throw new CustomError("Nenhum campo para atualização foi fornecido.", 400);
        }

        const user = await User.findById(id);
        if (!user) {
            throw new CustomError("Usuário não encontrado", 404);
        }

        if (email === user.email) throw new CustomError("Email já cadastrado.", 400);
        if (password && (await user.matchPassword(password)))
            throw new CustomError("Senha igual", 400);
        if (role === user.role) throw new CustomError("Mesmo cargo", 400);

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;
        if (role) user.role = role;

        await user.save();
        return {
            message: "Usuário atualizado com sucesso",
            user,
            token: generateToken(user._id, user.role),
        };
    };

    static deleteUser = async (id) => {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new CustomError("Usuário não encontrado", 404);
        }
        return { message: "Usuário excluído com sucesso!" };
    };
}

module.exports = AdminService;
