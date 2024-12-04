import React, { useState, useEffect } from "react";
import './styles/Main.css';
import fb from "../assets/facebook.png";
import google from "../assets/google.png";
import logo from "../assets/EDUSPACE.png";
import { useNavigate, Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Supabase initialization without environment variables
const SUPABASE_URL = "https://bwkkphvzmigjrnyptzhv.supabase.co"; // Replace with your Supabase URL
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a2twaHZ6bWlnanJueXB0emh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NTQ1MjYsImV4cCI6MjA0NzIzMDUyNn0.VObIEpLVaxmi6wW8fL3TCMTzfLswcB6cawsFbVgcXmQ"; // Replace with your Supabase anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const Main = ({setToken}) => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [alertMessage, setAlertMessage] = useState(null); // State for alert messages
    const [alertType, setAlertType] = useState("alert-info"); // Alert type (info, success, error)

    useEffect(() => {
        console.log("Alert type changed to:", alertType);
    }, [alertType]);

    const navigate = useNavigate(); // Initialize useNavigate

    function handleChange(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                throw error;
            }

            setAlertMessage("Successfully Logged In");
            setAlertType("alert-success");
            console.log(data);
            setToken(data);
            setTimeout(() => {
                navigate("/main");
            }, 1500);

        } catch (error) {
            setAlertMessage(error.message);
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
                                onChange={handleChange}
                            />
                        </label>
                        <Link to="/signup"><a className="link link-info">Don't have an account? Sign up here</a></Link>
                        <button className="btn btn-info" type="submit">
                            Sign In
                        </button>


                        <h1 className="font-light">or Sign In With:</h1>
                        <div>
                            <img src={fb} alt="fb" />
                            <img src={google} alt="google" />
                        </div>
                    </section>
                </form>
            </section>
        </>
    );
}

export default Main;
