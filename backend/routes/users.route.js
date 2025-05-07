import express from "express";
import { registerUser, loginUser, getMe, logoutUser } from "../controller/user.controller.js  ";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);
router.post("/logout", logoutUser);

export default router;