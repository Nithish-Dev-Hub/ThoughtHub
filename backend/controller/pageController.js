import Blog from "../models/blogModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

const getAllBlogData = asyncHandler (async(req, res) => {

    const blogs = await Blog.find().populate("author", "name email");
    if(blogs) {
        res.send({
            blogs: blogs
        });
    }
    else {
        res.status(404);
        throw new Error('No Feed to show');
    }
    
});

const getUserBlogData = asyncHandler (async(req, res) => {
    const authorId = req.user._id; // Ensure req.user._id is properly set

    // Find blogs by author's ID
    const blogs = await Blog.find({ author: authorId }).populate("author", "name email");
    
    if (blogs.length > 0) {
        res.send({ blogs });
    } else {
        res.status(404);
        throw new Error('No User Feed to show');
    }
    
});

const createBlogData = asyncHandler (async (req, res) => {
    const {title, content} = req.body;

    const newPost = await Blog.create({
        title,
        content,
        author: req.user._id
    })

    if (newPost) {
        res.status(201).json({
            _id: newPost._id,
            title: newPost.title,
            content: newPost.content,
            author: newPost.author,
        });
    }
    else {
        res.status(400);
        throw new Error('Couldnt create a the blog, try after sometime');
    }
});

export {getAllBlogData, createBlogData, getUserBlogData};