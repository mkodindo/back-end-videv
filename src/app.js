const express = require("express");
const rootRoutes = require("./routes/root.routes");
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const asyncHandler = require("./utils/asyncHandler");
const { authenticate } = require("./middleware/authenticate");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/errorHandler");

const app = express();

app.use(express.json({ limit: "100kb" }));

app.use("/", rootRoutes);
app.use("/auth", authRoutes);
app.use("/users", asyncHandler(authenticate), usersRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
