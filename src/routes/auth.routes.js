const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { signUp, signIn } = require("../controllers/authController");

const router = Router();

router.post("/signup", asyncHandler(signUp));
router.post("/signin", asyncHandler(signIn));

module.exports = router;
