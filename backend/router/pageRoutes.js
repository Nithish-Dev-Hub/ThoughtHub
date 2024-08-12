import express from "express";
import {getAllBlogData, createBlogData, getUserBlogData} from "../controller/pageController.js";
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/page/blogs",protect, getAllBlogData);
router.get("/page/myblogs",protect, getUserBlogData);
router.post("/blog/create",protect, createBlogData);

export default router;