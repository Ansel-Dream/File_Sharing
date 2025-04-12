import React, { useState } from "react";
import "../assets/Login.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for notifications
import { useAuth } from "../Context/contextapi"; // Import your Auth context

export default function HauntedAuthPortal() {
    const { storeTokenInLs } = useAuth();
    const [isHaunted, setIsHaunted] = useState(false);
    const navigate = useNavigate();

    // State hooks for Sign Up form
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // State hooks for Sign In form
    const [signinData, setSigninData] = useState({
        username: "",
        email: "",
        password: ""
    });

    // Handle change for Sign Up form
    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle change for Sign In form
    const handleSigninChange = (e) => {
        const { name, value } = e.target;
        setSigninData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle Sign Up form submit
    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupData) // Send signup data as JSON
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Registration Successful:");

                storeTokenInLs(data.token); // Store token in local storage
                setSignupData({ email: "", password: "" }); // Reset form fields
                navigate("/");
                // Handle success (e.g., redirect, show message, etc.)
            } else {
                toast.error(`${data.message}`);
            }
        } catch (error) {
            toast.error("Error during registration:", error);
            // Handle network error or other issues
        }
    };

    // Handle Sign In form submit
    const handleSigninSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signinData) // Send signin data as JSON
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Login Successful:");

                storeTokenInLs(data.token); // Store token in local storage
                setSigninData({ email: "", password: "" }); // Reset form fields
                navigate("/"); // Redirect to home page after successful login

                // Handle success (e.g., redirect, show message, etc.)
            } else {
                const errorData = await response.json();
                toast.error(`${errorData.message}`);
            }
        } catch (error) {
            console.error("Error during login:", error);
            // Handle network error or other issues
        }
    };

    return (
        <div className="login-form-most-outsider">
            <div className="ghoul-outermost">
                <div className={`crypt ${isHaunted ? "awakened" : ""}`} id="crypt">
                    <div className="ghost-form-container phantom-sign-up">
                        <form onSubmit={handleSignupSubmit}>
                            <h1 className="text-black">Create Account</h1>
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={signupData.name}
                                onChange={handleSignupChange}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={signupData.email}
                                onChange={handleSignupChange}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={signupData.password}
                                onChange={handleSignupChange}
                            />
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>

                    <div className="ghost-form-container phantom-sign-in">
                        <form onSubmit={handleSigninSubmit}>
                            <h1 className="text-black">Sign In</h1>
                            <input
                                type="text"
                                placeholder="UserName"
                                name="username"
                                value={signinData.username}
                                onChange={handleSigninChange}
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={signinData.email}
                                onChange={handleSigninChange}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={signinData.password}
                                onChange={handleSigninChange}
                            />
                            <a href="#">Forget Your Password?</a>
                            <button type="submit">Sign In</button>
                        </form>
                    </div>

                    <div className="veil-toggle-container">
                        <div className="veil-toggle">
                            <div className="veil-toggle-panel veil-left">
                                <h1>Hello!</h1>
                                <p>
                                    Register please to enjoy all the features<br />
                                    If already have an account click below
                                </p>
                                <button className="ghostly-button" onClick={() => setIsHaunted(false)}>
                                    Sign In
                                </button>
                            </div>
                            <div className="veil-toggle-panel veil-right">
                                <h1>Welcome Back!</h1>
                                <p>
                                    Please Login and enjoy<br />
                                    If don't have account click Below
                                </p>
                                <button className="ghostly-button" onClick={() => setIsHaunted(true)}>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
