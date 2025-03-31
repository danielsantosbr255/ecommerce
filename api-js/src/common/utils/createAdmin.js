const User = require("../models/User");

const createAdmin = async () => {
    try {
        const hasAdmin = await User.findOne({ role: "admin" });

        if (!hasAdmin) {
            const admin = new User({
                name: process.env.ADMIN_NAME,
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                role: "admin",
            });

            await admin.save();
            console.log("Usuário administrador criado com sucesso!");
        } else {
            console.log("Usuário administrador já existe.");
        }
    } catch (error) {
        console.error("Erro ao criar usuário admin:", error);
    }
};

module.exports = { createAdmin };
