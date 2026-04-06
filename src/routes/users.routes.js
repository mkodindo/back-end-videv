const { Router } = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
} = require("../controllers/usersController");

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

module.exports = router;
