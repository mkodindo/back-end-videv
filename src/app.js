const express = require("express");
const rootRoutes = require("./routes/root.routes");
const usersRoutes = require("./routes/users.routes");

const app = express();

app.use(express.json());

app.use("/", rootRoutes);
app.use("/users", usersRoutes);

module.exports = app;
