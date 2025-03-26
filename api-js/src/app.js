require("dotenv").config();
require("express-async-errors");

const app = require("./app.module");
const { connectDB } = require("./config/database/prisma");

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
    });
});
