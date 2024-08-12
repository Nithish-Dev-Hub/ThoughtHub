import { useDispatch, useSelector } from "react-redux";
import {createPost} from "../slices/blogSlice";
import { useState, useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast, Bounce } from "react-toastify";


function CreatePost() {
    const dispatch = useDispatch();
    const { createStatus, error} = useSelector((state)=> state.blog);
    const defaultFormData = useMemo(() => ({
        title: "",
        content: ""
    }), []);

    const toastConfig = useMemo(() => ({
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    }), []);

    const [formData, setFormData] = useState(defaultFormData);
    const [errors, setErrors] = useState({});

    const updateFormData = useCallback((val, type) => {
        setFormData(prevData => ({ ...prevData, [type]: val }));
        setErrors(prevErrors => ({ ...prevErrors, [`${type}Error`]: "" }));
    }, []);

    const validate = useCallback(() => {
        let validationErrors = {};
        const { title, content } = formData;

        if (!title) {
            validationErrors.titleError = 'Title is required';
        } 

        if (!content) {
            validationErrors.contentError = "Content is required";
        } 

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }, [formData]);

    const handleSubmit = useCallback(async () => {
        if (validate()) {
            const payload = {
                title: formData.title,
                content: formData.content
            }
            dispatch(createPost(payload));            
        }
    }, [formData, dispatch, validate]);

    useEffect(()=>{
        if(createStatus === "Success") {
            toast.success("Post Created Successfully", toastConfig);
            setFormData(defaultFormData);
        }
        else if(error) {
            toast.error(error.message, toastConfig)
        }
    },[createStatus, defaultFormData, error, toastConfig]);
    const { title, content } = formData;
    const { titleError, contentError } = errors;
    
    return (
        <div>
            <div className="btn-container">
                <Link className="btn-element" to="/home">All Blogs</Link>
                <Link className="btn-element" to="/dashboard">My Blogs</Link>
            </div>
        <div className="form-container">
                <h1>Create Blog Post</h1>
            <div className="input-container">
                <label>
                    Title:{titleError && <span id="title-error" style={{ color: 'red' }}>{titleError}</span>}
                    <input
                        className="input-element"
                        type="text"
                        value={title}
                        onChange={(e) => updateFormData(e.target.value, "title")}
                        aria-label="Title"
                        aria-invalid={!!titleError}
                        aria-describedby="title-error"
                    />                    
                </label>
            </div>
            <div className="input-container">
                <label>
                    Content:{contentError && <span id="content-error" style={{ color: 'red' }}>{contentError}</span>}
                    <textarea
                        className="input-element"
                        value={content}
                        onChange={(e) => updateFormData(e.target.value, "content")}
                        aria-label="Content"
                        aria-invalid={!!contentError}
                        aria-describedby="content-error"
                    />
                    
                </label>
            </div>
            <div className="input-container">
                <button
                    className="input-element"
                    type="button"
                    onClick={handleSubmit}
                    aria-label="Create"
                >
                    Create
                </button>
            </div>
        </div>
        </div>
        

        
    )
}

export default CreatePost;