import logo from '../logo.svg';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProfile, logoutUser } from '../slices/authSlice.js';
import {getBlog} from "../slices/blogSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function AppHeader() {
    const dispatch = useDispatch();
    const {loggedIn} =  useSelector((state) => state.auth);
    const location = useLocation();
    const shouldShowButton = location.pathname === '/';
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
    }

    const {user} = useSelector((state)=> state.auth);
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(sessionStorage.getItem("userInfo")){
            dispatch(getProfile());
            dispatch(getBlog());
        }        
    },[dispatch]);

    useEffect(()=>{
        if(user) {
            if(sessionStorage.getItem("userInfo")){
                const userSession = JSON.parse(sessionStorage.getItem("userInfo"));
                if(!(user.name === userSession.name && user.email === userSession.email)){
                    dispatch(logoutUser());
                    navigate("/login");
                } 
            }
            else {
                sessionStorage.setItem("userInfo", JSON.stringify(user));
            }
            
        }
    },[user, dispatch, navigate]);

    useEffect(()=>{
        if(!loggedIn) {
            if(sessionStorage.getItem("userInfo")){
                sessionStorage.removeItem("userInfo");
            }
        }
    },[loggedIn]);

    return (
        <div className="header-container">
            <div className="logo-container">
                <Link to="/"><img src={logo} alt="logo"/></Link><h1>ThoughtHub</h1>
            </div>
            <div>
                <nav>
                     {loggedIn && 
                        <div className="btn-container">
                            <button className="btn-element" onClick={handleLogout}>Logout</button>
                            <Link className="btn-element" to="/create">Create Post</Link> 
                            {shouldShowButton && (
                                <Link className="btn-element" to="/home">Blogs</Link>
                            )}
                        </div>
                    } 
                    {!loggedIn &&
                            <ul className="btn-container">
                                <li>
                                    <Link className="btn-element" to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link className="btn-element" to="/register">Register</Link>
                                </li>
                            </ul>
                        }
                </nav>
            </div>
        </div>
    );
}

export default AppHeader;