import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {getuserBlog} from "../slices/blogSlice";

const Layout = () => {
    const {user, loggedIn} = useSelector((state) => state.auth);
    const {userBlog} =  useSelector((state) => state.blog);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!loggedIn) {
            navigate("/");
        }
        dispatch(getuserBlog());
    },[dispatch, loggedIn, navigate]);

    
    return (
        <div>
            <div className="btn-container">
                <Link className="btn-element" to="/home">All Blogs</Link>
            </div>
            {user && (
                <ul className="user-info">
                    <li><h1>User Data</h1></li>
                    <li><strong>ID:</strong> <span>{user._id}</span></li>
                    <li><strong>Name:</strong> <span>{user.name}</span></li>
                    <li><strong>Email:</strong> <span>{user.email}</span></li>
                    <li><strong>Phone:</strong> <span>{user.phone}</span></li>
                </ul>
            )}

            { 
                <div className="blog-container">  
                <h1>My Posts</h1>      
                    {userBlog && userBlog.blogs && userBlog.blogs.length > 0 ? (
                    userBlog.blogs.map((blog) => (
                        <div key={blog._id} className="blog-post">
                        <h2 className="blog-title">{blog.title}</h2>
                        <p className="blog-content">{blog.content}</p>
                        <div className="blog-author-info">
                            <p className="blog-author">Author: {blog.author.name}</p>
                            <p className="blog-email">Email: {blog.author.email}</p>
                        </div>
                        </div>
                    ))
                    ) : (
                        <p className="prompt-message">
                            Create one to see your personal Blogs <Link className="prompt-link" to="/create">Create</Link>
                        </p>
                    
                    )}
                </div>
            }
        </div>
    )
}

export default Layout;