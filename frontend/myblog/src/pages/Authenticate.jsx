import { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

import { loginUser } from "../slices/authSlice";

const Authenticate = () => {
    const dispatch = useDispatch();
    const {user, loggedIn, error} = useSelector((state)=> state.auth);
    const navigate = useNavigate();
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

    const defaultFormData = {
        email: "",
        password: ""
    };

    useEffect(()=> {
        if(user && loggedIn) {
            toast.success("Logged In Succesfully", toastConfig);
            sessionStorage.setItem("userInfo", JSON.stringify(user));
            navigate("/home");
        }
        else if(error) {
            toast.error(error.message, toastConfig);
        }
    }, [user, loggedIn, navigate, toastConfig, error])

    const [formData, setFormData] = useState(defaultFormData);
    const [errors, setErrors] = useState({});

    const updateFormData = useCallback((val, type) => {
        setFormData(prevData => ({ ...prevData, [type]: val }));
        setErrors(prevErrors => ({ ...prevErrors, [`${type}Error`]: "" }));
    }, []);

    const validate = useCallback(() => {
        let validationErrors = {};
        const { email, password } = formData;

        if (!email) {
            validationErrors.emailError = 'Email is required';
        } else {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                validationErrors.emailError = "Email is invalid";
            }
        }

        if (!password) {
            validationErrors.passwordError = "Password is required";
        } else {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordPattern.test(password)) {
                validationErrors.passwordError = "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.";
            }
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    },[formData]);

    const handleSubmit = useCallback(async () => {
        if (validate()) {
            const payload = {
                email: formData.email,
                password: formData.password
            }
            dispatch(loginUser(payload));            
        }
    }, [formData, dispatch, validate]);


    const { email, password } = formData;
    const { emailError, passwordError } = errors;

    return (
        <div className="form-container">
                <h1>Login Form</h1>
            <div className="input-container">
                <label>
                    Email:{emailError && <span id="email-error" style={{ color: 'red' }}>{emailError}</span>}
                    <input
                        className="input-element"
                        type="text"
                        value={email}
                        onChange={(e) => updateFormData(e.target.value, "email")}
                        aria-label="Email"
                        aria-invalid={!!emailError}
                        aria-describedby="email-error"
                    />                    
                </label>
            </div>
            <div className="input-container">
                <label>
                    Password:{passwordError && <span id="password-error" style={{ color: 'red' }}>{passwordError}</span>}
                    <input
                        className="input-element"
                        type="password"
                        value={password}
                        onChange={(e) => updateFormData(e.target.value, "password")}
                        aria-label="Password"
                        aria-invalid={!!passwordError}
                        aria-describedby="password-error"
                    />                    
                </label>
            </div>
            <div className="input-container">
                <button
                    className="input-element"
                    type="button"
                    onClick={handleSubmit}
                    aria-label="Login"
                >
                    Login
                </button>
            </div>
        </div>    
    );
};

export default Authenticate;