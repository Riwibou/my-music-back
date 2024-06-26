const express = require("express");
const { signUp, signIn, addUser, updateUser, deleteUser, getUser, getAllUsers } = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", getAllUsers);

module.exports = router;
