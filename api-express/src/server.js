require("express-async-errors")
const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./_app/config/db").connectDB();
require("./_app/utils/createAdmin").createAdmin();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", require("./routes"));

app.use(require("./_app/utils/errorHandler"));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running in on port: 3000`);
});
