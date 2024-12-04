import { useState, useEffect } from 'react';
import './styles/GroupChannel.css'
import techsub from "../assets/robotic-hand.png"
import { createClient } from "@supabase/supabase-js";

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

function GroupChannel({ channelDetails }) {

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

            <section className='channel-content shadow-xl'>
                <div className="post">
                    <div className="post-author">
                        <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt="author" />
                        <h4>Patrick Paul Leonen</h4>
                    </div>

                    <div className="post-content">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro odio optio enim. Minima, at consequuntur odio, fugiat quas natus ipsa amet rem in, magni cumque. Quasi voluptatibus omnis sit modi?</p>
                    </div>

                    <div className="post-buttons">
                        <div className="collapse attachments">
                            <input type="checkbox" />
                            <div className="collapse-title text-s font-medium">View Atachments</div>
                            <div className="collapse-content">
                                <p>No attachments available</p>
                            </div>
                        </div>

                        <div className="collapse comments">
                            <input type="checkbox" />
                            <div className="collapse-title text-s font-medium">View Comments</div>
                            <div className="collapse-content">
                                <div className="comment-box">
                                    <textarea className="textarea textarea-bordered w-full" placeholder="Write a comment here"></textarea>
                                    <img src={send} alt="send" />
                                </div>

                                <div className="comment">
                                    <div className="comment-author">
                                        <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt="author" />
                                        <h4>Patrick Paul Leonen</h4>
                                    </div>
                                    <p className="comment-time">12:00</p>
                                    <p className='comment-content'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates delectus voluptatum nisi, ipsum dolorum praesentium, obcaecati illo et maxime ducimus, necessitatibus neque reprehenderit culpa! Quos voluptatibus temporibus placeat excepturi necessitatibus.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>




            </section>


        </>


    )
}

export default GroupChannel
