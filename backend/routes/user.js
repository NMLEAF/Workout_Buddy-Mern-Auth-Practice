const express = require("express");

const router = express.Router();

const {
  loginUser,
  signupUser,
  deleteAllUsers,
  getAllUsers,
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// get all users
router.get("/", getAllUsers);

// delete all users
router.delete("/", deleteAllUsers);

module.exports = router;
