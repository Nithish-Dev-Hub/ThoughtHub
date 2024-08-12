import mongoose from "mongoose";

const BlogPostSchema = mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true 
        },
        content: { 
            type: String, 
            required: true 
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model('BlogPost', BlogPostSchema);

export default Blog;

  