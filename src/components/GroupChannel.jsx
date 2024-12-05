import { useState, useEffect } from 'react';
import './styles/GroupChannel.css'
import techsub from "../assets/robotic-hand.png"
import { createClient } from "@supabase/supabase-js";
import CreateModalChannel from './CreateModalChannel';
import ChannelContent from './ChannelContent';
import CreateModalAssignment from './CreateModalAssignment';

import send from "../assets/send.png";
import alpha from "../assets/alpha.png";
import beta from "../assets/beta.png";
import delta from "../assets/delta.png";
import epsilon from "../assets/epsilon.png";
import eta from "../assets/eta.png";
import gamma from "../assets/gamma.png";

const SUPABASE_URL = "https://bwkkphvzmigjrnyptzhv.supabase.co"; // Replace with your Supabase URL
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a2twaHZ6bWlnanJueXB0emh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NTQ1MjYsImV4cCI6MjA0NzIzMDUyNn0.VObIEpLVaxmi6wW8fL3TCMTzfLswcB6cawsFbVgcXmQ"; // Replace with your Supabase anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function GroupChannel({ channelDetails, token, posts, categories }) {

    const imageMap = {
        alpha,
        beta,
        delta,
        epsilon,
        eta,
        gamma,
    };



    const [creatorName, setCreatorName] = useState("Loading...");

    useEffect(() => {
        const fetchCreatorName = async () => {
            if (!channelDetails.creator_id) {
                setCreatorName("Unknown Creator");
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('tbl_users') // Replace with your actual table name
                    .select('name') // Replace 'name' with the correct column name
                    .eq('id', channelDetails.creator_id)
                    .single();

                if (error) {
                    console.error("Error fetching creator:", error);
                    setCreatorName("Error fetching creator");
                } else {
                    setCreatorName(data?.name || "Unknown Creator");
                }
            } catch (error) {
                console.error("Unexpected error fetching creator:", error);
                setCreatorName("Error fetching creator");
            }
        };

        fetchCreatorName();
    }, [channelDetails.creator_id]);

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

    return (
        <>
            <section className='channel-banner shadow-xl'>
                <img className='channel-img' src={imageMap[channelDetails.channel_image]} alt="channel-img" />
                <div className='details'>
                    <div>
                        <h1>{channelDetails.channel_name}</h1>
                        <h2>{channelDetails.section_name || " "}</h2>
                    </div>
                    <div>
                        <h3>{creatorName}</h3>
                        <h4>{channelDetails.channel_code}</h4>
                    </div>
                </div>
            </section>

            <div className="flex mt-4 gap-3">
                <button className="btn btn-active btn-primary" onClick={() => document.getElementById("create_modal_channel").showModal()}>Create Post</button>
                {userName === creatorName && (
                    <button className="btn btn-active btn-primary" onClick={() => document.getElementById("create_modal_assignment").showModal()}>Create Assignment</button>
                )}
            </div>
            <CreateModalChannel channelDetails={channelDetails} token={token} />
            <CreateModalAssignment channelDetails={channelDetails} token={token} />


            <section className='channel-content shadow-xl'>
                <ChannelContent posts={posts} categories={categories} channelDetails={channelDetails} />
            </section>


        </>


    )
}

export default GroupChannel
