import express from "express";
import {
    userLogin,
    userLogout,
    userRegistration,
    updateUserData,
    getUserData
} from "../controller/userController.js";
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/login", userLogin);
router.get("/logout", userLogout);
router.post("/register", userRegistration);
router.route("/profile").put(protect, updateUserData).get(protect, getUserData);

export default router;