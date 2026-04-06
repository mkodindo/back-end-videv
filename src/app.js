const express = require("express");
const rootRoutes = require("./routes/root.routes");
const usersRoutes = require("./routes/users.routes");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/errorHandler");

const app = express();

app.use(express.json({ limit: "100kb" }));

app.use("/", rootRoutes);
app.use("/users", usersRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
