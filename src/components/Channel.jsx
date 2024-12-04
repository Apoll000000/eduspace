import { useState, useEffect } from 'react'
import './styles/Channel.css'
import './styles/Sidebar.css'
import NewPage from './General'
import GroupChannel from './GroupChannel'
import DefaultChannel from './DefaultChannel'
import plus from "../assets/plus.png";
import message from "../assets/chat.png";
import school from "../assets/school.png";
import bell from "../assets/bell.png";
import techsub from "../assets/robotic-hand.png";
import { useNavigate, Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import JoinModal from './JoinModal'
import CreateModal from './CreateModal'
import PostModal from './PostModal'

import alpha from "../assets/alpha.png";
import beta from "../assets/beta.png";
import delta from "../assets/delta.png";
import epsilon from "../assets/epsilon.png";
import eta from "../assets/eta.png";
import gamma from "../assets/gamma.png";


const SUPABASE_URL = "https://bwkkphvzmigjrnyptzhv.supabase.co"; // Replace with your Supabase URL
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a2twaHZ6bWlnanJueXB0emh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NTQ1MjYsImV4cCI6MjA0NzIzMDUyNn0.VObIEpLVaxmi6wW8fL3TCMTzfLswcB6cawsFbVgcXmQ"; // Replace with your Supabase anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const Channel = ({ token }) => {

    const [activeComponent, setActiveComponent] = useState("DefaultChannel");
    const [selectedChannel, setSelectedChannel] = useState(null);


    const showGeneral = () => setActiveComponent('GeneralChannel');

    const imageMap = {
        alpha,
        beta,
        delta,
        epsilon,
        eta,
        gamma,
    };


    const navigate = useNavigate();

    function handleLogout() {
        sessionStorage.removeItem('token');
        setTimeout(() => {
            navigate("/");
        }, 1500);
    }

    const [userName, setUserName] = useState("");

    useEffect(() => {
        async function fetchName() {
            const { data, error } = await supabase
                .from("tbl_users") // Replace with your table name
                .select("name")
                .eq("id", token?.user?.id);

            if (error) {
                console.error("Error fetching data:", error);
            } else if (data && data.length > 0) {
                setUserName(data[0].name);
            }
        }

        fetchName();
    }, [token]);

    const [channels, setChannels] = useState([]);

    // Function to fetch channels
    const fetchChannels = async () => {
        if (!token?.user?.id) return;

        try {
            // Step 1: Get channel codes from tbl_enrollments
            const { data: enrollments, error: enrollmentsError } = await supabase
                .from('tbl_enrollments')
                .select('channel_code')
                .eq('user_id', token.user.id);

            if (enrollmentsError) throw enrollmentsError;

            const channelCodes = enrollments.map((enrollment) => enrollment.channel_code);

            if (channelCodes.length > 0) {
                // Step 2: Fetch channel details from tbl_channels
                const { data: channelsData, error: channelsError } = await supabase
                    .from('tbl_channels')
                    .select('*')
                    .in('channel_code', channelCodes);

                if (channelsError) throw channelsError;

                setChannels(channelsData);
            }
        } catch (error) {
            console.error('Error fetching channels:', error);
        }
    };

    useEffect(() => {
        fetchChannels();
    }, [token]);

    const showGroup = (channel) => {
        setSelectedChannel(channel); // Set the selected channel
        setActiveComponent('GroupChannel'); // Show the GroupChannel component
    };


    return (
        <>
            <main className='mainpage'>
                <nav id="sidebar">
                    <div className="docker">
                        <div className="dropdown dropdown-start">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li onClick={() => document.getElementById('profile_modal').showModal()}>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li onClick={handleLogout}><a>Logout</a></li>
                            </ul>
                        </div>

                        <dialog id="profile_modal" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg">Hello {userName || "User"}! </h3>
                                <p className="py-4">Press ESC key or click on ✕ button to close</p>
                            </div>
                        </dialog>

                        <img className="sidenav" src={plus} alt="plus" onClick={() => document.getElementById('plus-modal').showModal()} />

                        <dialog id="plus-modal" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <ul className="menu text-base-content min-h-full w-full p-1 mt-2">
                                    {/* Sidebar content here */}
                                    <li onClick={() => document.getElementById('join_modal').showModal()}><a>Join a Channel/Class</a></li>
                                    <JoinModal token={token} />

                                    <li onClick={() => document.getElementById("create_modal").showModal()}>
                                        <a>Create a Channel/Class</a>
                                    </li>
                                    <CreateModal token={token} />

                                    <li onClick={() => document.getElementById("post_modal").showModal()}><a>Create a Public Post</a></li>
                                    <PostModal token={token} />
                                </ul>
                            </div>
                        </dialog>

                        <div className="indicator sidenav">
                            <img className="sidenav" src={message} alt="message" />
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>

                        <img className="sidenav" src={school} alt="school" />

                        <div className="indicator sidenav">
                            <img className="sidenav" src={bell} alt="bell" />
                            <span className="badge badge-xs badge-primary indicator-item"></span>

                        </div>

                        <label className="swap swap-rotate absolute bottom-4 right-400">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" className="theme-controller" value="synthwave" />

                            {/* sun icon */}
                            <svg
                                className="swap-off h-10 w-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-on h-10 w-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                    </div>

                    <button className="btn home shadow-xl" onClick={showGeneral}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>

                        HOME
                    </button>

                    <button className="btn home shadow-xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM6 2v16"
                            />
                        </svg>

                        ASSIGNMENTS
                    </button>

                    <h1>CHANNELS</h1>
                    <div className="classes">
                        {channels.map((channel) => (
                            <button key={channel.channel_code} className="channel" onClick={() => showGroup(channel)}>
                                <img src={imageMap[channel.channel_image]} alt="channel" />
                                <p>{channel.channel_name}</p>
                                <div className="badge badge-primary">99+</div>
                            </button>
                        ))}
                    </div>

                </nav>
                <div className='container-channel'>
                    {activeComponent === 'DefaultChannel' && <DefaultChannel />}
                    {activeComponent === 'GeneralChannel' && <NewPage />}
                    {activeComponent === 'GroupChannel' && <GroupChannel channelDetails={selectedChannel} />}
                </div>

            </main>


        </>
    )
}

export default Channel;
