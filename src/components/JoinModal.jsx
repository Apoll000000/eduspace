import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://bwkkphvzmigjrnyptzhv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a2twaHZ6bWlnanJueXB0emh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NTQ1MjYsImV4cCI6MjA0NzIzMDUyNn0.VObIEpLVaxmi6wW8fL3TCMTzfLswcB6cawsFbVgcXmQ"; // Replace with your Supabase anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function JoinModal({ token }) {
    const [alertMessage, setAlertMessage] = useState(null); // State for alert messages
    const [alertType, setAlertType] = useState("alert-info");

    useEffect(() => {
        console.log("Alert type changed to:", alertType);
    }, [alertType]);

    const [channelCode, setChannelCode] = useState(""); // State for channel code input

    const handleJoin = async (e) => {
        e.preventDefault(); // Prevent form submission reload

        if (!channelCode) {
            setAlertType("alert-error");
            setAlertMessage("Channel code cannot be empty.");
            return;
        }

        try {
            // Check if the channel code exists in tbl_channels
            const { data: channelData, error: channelError } = await supabase
                .from("tbl_channels")
                .select("channel_code")
                .eq("channel_code", channelCode)
                .single();

            if (channelError || !channelData) {
                setAlertType("alert-error");
                setAlertMessage("Invalid Channel Code");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
                return;
            }

            // Check for duplicates in tbl_enrollments
            const { data: enrollmentData, error: enrollmentError } = await supabase
                .from("tbl_enrollments")
                .select("user_id")
                .eq("channel_code", channelCode)
                .eq("user_id", token.user.id)
                .single();

            if (enrollmentData) {
                setAlertType("alert-error");
                setAlertMessage("You are already enrolled in this channel.");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
                return;
            } else {
                // Insert into tbl_enrollments
                const { error: enrollError } = await supabase
                    .from("tbl_enrollments")
                    .insert({
                        channel_code: channelCode,
                        user_id: token.user.id,
                    });

                if (enrollError) {
                    throw enrollError;
                }

                setAlertType("alert-success");
                setAlertMessage("Successfully enrolled in the channel!");
                setChannelCode(""); // Clear input field
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }


        } catch (error) {
            setAlertType("alert-error");
            setAlertMessage("An error occurred. Please try again.");
            console.error("Error joining channel:", error.message);
        }
    };

    return (
        <>
            <dialog id="join_modal" className="modal">
                <div className="modal-box">
                    {alertMessage && (
                        <div role="alert" className={`alert ${alertType}`}>
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

                    <form onSubmit={handleJoin}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text channel-id text-l">Class/Channel ID</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter class ID here. Include the '-'"
                                className="input input-bordered w-full"
                                value={channelCode}
                                onChange={(e) => setChannelCode(e.target.value)}
                            />
                        </label>
                        <div className="flex justify-end mt-2 w-full gap-2">
                            <button type="button" className="btn btn-neutral" onClick={() => document.getElementById("join_modal").close()}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Join
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default JoinModal;
