const { Router } = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
} = require("../controllers/usersController");

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);

module.exports = router;
