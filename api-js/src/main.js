require("dotenv").config();
require("express-async-errors");

const app = require("./app.module");
const { connectDB } = require("./common/database/prisma");

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
    });
});
