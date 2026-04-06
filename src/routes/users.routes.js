const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const router = Router();

router.get("/", asyncHandler(getAllUsers));
router.post("/", asyncHandler(createUser));
router.get("/:id", asyncHandler(getUserById));
router.put("/:id", asyncHandler(updateUser));
router.delete("/:id", asyncHandler(deleteUser));

module.exports = router;
