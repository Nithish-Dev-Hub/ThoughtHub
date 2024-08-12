import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {getBlog} from "../slices/blogSlice";
const BlogPage = () => {

  const {loggedIn} = useSelector((state) => state.auth);
    const {data} =  useSelector((state) => state.blog);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getBlog());
    },[dispatch, loggedIn, navigate]);

  return (
    <div>
        { loggedIn && <div className="btn-container">
            <Link className="btn-element" to="/dashboard">My Blogs</Link>
        </div>}
        <div className="blog-container">        
            {data && data.blogs && data.blogs.length > 0 ? (
            data.blogs.map((blog) => (
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
                <p class="prompt-message">
                    Please <Link to="/login" class="prompt-link">Login</Link> to see all the blogs
                </p>              
            )}
        </div>
    </div>
    
  );
};


export default BlogPage;
