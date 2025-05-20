import express from "express";
import { registerUser, loginUser, getMe, logoutUser, fetchAllUsers, fetchUserById, updateUser, deleteUser } from "../controller/user.controller.js  ";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);
router.post("/logout", logoutUser);
router.get("/", fetchAllUsers);
router.get("/:id", fetchUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;