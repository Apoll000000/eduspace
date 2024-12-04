import React, { useState, useEffect } from "react";
import './styles/Main.css';
import logo from "../assets/EDUSPACE.png";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bwkkphvzmigjrnyptzhv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a2twaHZ6bWlnanJueXB0emh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NTQ1MjYsImV4cCI6MjA0NzIzMDUyNn0.VObIEpLVaxmi6wW8fL3TCMTzfLswcB6cawsFbVgcXmQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [alertMessage, setAlertMessage] = useState(null); // State for alert messages
    const [alertType, setAlertType] = useState("alert-info"); // Alert type (info, success, error)
    useEffect(() => {
        console.log("Alert type changed to:", alertType);
    }, [alertType]);

    function handleChange(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setAlertMessage("Passwords do not match. Please try again.");
            setAlertType("alert-error");
            return;
        }

        try {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (signUpError) throw signUpError;

            setAlertMessage("Check your email for verification.");
            setAlertType("alert-warning");

            // Add a retry mechanism with a maximum number of attempts
            let attempts = 0;
            const maxAttempts = 10;
            const userId = signUpData.user.id;

            while (attempts < maxAttempts) {
                await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds

                const { data: sessionData } = await supabase.auth.refreshSession();
                if (sessionData?.user?.email_confirmed_at) {
                    const { error: insertError } = await supabase
                        .from("tbl_users")
                        .insert([{ id: userId, name: formData.email, created_at: new Date().toISOString() }]);

                    if (insertError) throw insertError;

                    // setAlertMessage("Account created successfully and added to the database.");
                    // setAlertType("alert-success");
                    return;
                }
                attempts++;
            }

            setAlertMessage("Verification timeout. Please verify your email manually.");
            setAlertType("alert-error");
        } catch (error) {
            setAlertMessage(error.message || "An unexpected error occurred.");
            setAlertType("alert-error");
        }
    }



    return (
        <>
            <section className="login-page">
                <aside>
                    <label className="swap swap-rotate fixed top-4 left-4">
                        {/* Theme toggle */}
                        <input type="checkbox" className="theme-controller" value="synthwave" />
                        <svg className="swap-off h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            {/* Sun icon */}
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        {/* Moon icon */}
                        <svg className="swap-on h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                </aside>

                <section id="hero">
                    <h1>EduSpace</h1>
                    <img src={logo} alt="logo" />
                </section>

                {/* Alert Section */}
                {alertMessage && (
                    <div role="alert" className={`fixed top-3 alert ${alertType}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="h-6 w-6 shrink-0 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <span>{alertMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <section id="login">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text font-semibold">Email Login:</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter email here"
                                className="input input-bordered w-full max-w-xs"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text font-semibold">Password:</span>
                            </div>
                            <input
                                type="password"
                                placeholder="Enter password here"
                                className="input input-bordered w-full max-w-xs"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text font-semibold">Confirm Password:</span>
                            </div>
                            <input
                                type="password"
                                placeholder="Enter password here"
                                className="input input-bordered w-full max-w-xs"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </label>
                        <button type="submit" className="btn btn-info">
                            Sign Up
                        </button>
                    </section>
                </form>
            </section>
        </>
    );
}

export default Signup;
