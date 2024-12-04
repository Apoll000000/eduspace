import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './styles/General.css';
import send from "../assets/send.png";

const SUPABASE_URL = "https://bwkkphvzmigjrnyptzhv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a2twaHZ6bWlnanJueXB0emh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NTQ1MjYsImV4cCI6MjA0NzIzMDUyNn0.VObIEpLVaxmi6wW8fL3TCMTzfLswcB6cawsFbVgcXmQ"; // Replace with your Supabase anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function General() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Fetch posts from Supabase
    useEffect(() => {
        async function fetchPosts() {
            const { data, error } = await supabase
                .from('tbl_posts')
                .select(`
                *,
                tbl_users (name)
            `);

            if (error) {
                console.error('Error fetching posts:', error);
            } else {
                setPosts(data);

                // Extract unique categories
                const uniqueCategories = [...new Set(data.map(post => post.post_category))];
                setCategories(uniqueCategories);
            }
        }

        fetchPosts();
        console.log(posts);
    }, []);

    return (
        <div className="general-container">
            {categories.map(category => (
                <div key={category} className="category-section">
                    {posts
                        .filter(post => post.post_category === category)
                        .map(post => (
                            <div key={post.id} className="post">
                                <div className="post-author">
                                    <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt="author" />
                                    <h4>{post.tbl_users?.name || 'Unknown User'}</h4>
                                </div>

                                <div className="post-content">
                                    <p>{post.content || 'No content available'}</p>
                                </div>

                                <div className="post-buttons">
                                    {/* Attachments */}
                                    {post.attachments && post.attachments.length > 0 && (
                                        <div className="collapse attachments">
                                            <input type="checkbox" />
                                            <div className="collapse-title text-s font-medium">View Attachments</div>
                                            <div className="collapse-content">
                                                {post.attachments.map((attachment, index) => (
                                                    <p key={index}>{attachment}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {post.post_category === "text" && (
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
                                    )}

                                    {post.post_category === "textAttachment" && (
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
                                    )}

                                    {/* Poll Options */}
                                    {post.poll_options && post.poll_options.length > 0 && (
                                        <div className="collapse comments">
                                            <input type="checkbox" />
                                            <div className="collapse-title text-s font-medium">View Poll</div>
                                            <div className="collapse-content">
                                                {post.poll_options.map((option, index) => (
                                                    <div key={index} className="poll">
                                                        <h3>{option}</h3>
                                                        <progress className="progress progress-info w-full" value="0" max="100"></progress>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Survey Questions */}
                                    {post.survey_questions && post.survey_questions.length > 0 && (
                                        <div
                                            className="collapse comments"
                                            onClick={() => document.getElementById(`survey_modal_${post.id}`).showModal()}
                                        >
                                            <input type="checkbox" />
                                            <div className="collapse-title text-s font-medium">View Survey</div>
                                            <dialog id={`survey_modal_${post.id}`} className="modal">
                                                <div className="modal-box">
                                                    <form method="dialog">
                                                        <h3 className="font-bold text-lg">Survey Questions</h3>
                                                        <p className="py-4 survey_desc">{post.content}</p>
                                                        <div className="py-4">
                                                            {post.survey_questions.map((question, index) => (
                                                                <div key={index} className={`squestion survey_${question.type}`}>
                                                                    <h4>{question.text}</h4>
                                                                    {question.type === "yesNo" && (
                                                                        <div className="survey_options">
                                                                            <label className="flex gap-2 items-center mt-1">
                                                                                <input
                                                                                    type="radio"
                                                                                    name={`survey_${post.id}_${index}`}
                                                                                    value="Yes"
                                                                                    className="radio radio-info"
                                                                                />
                                                                                <span>Yes</span>
                                                                            </label>
                                                                            <label className="flex gap-2 items-center mt-1">
                                                                                <input
                                                                                    type="radio"
                                                                                    name={`survey_${post.id}_${index}`}
                                                                                    value="No"
                                                                                    className="radio radio-info"
                                                                                />
                                                                                <span>No</span>
                                                                            </label>
                                                                        </div>
                                                                    )}
                                                                    {question.type === "rating" && question.equivalents && (
                                                                        <div className="survey_options">
                                                                            {question.equivalents.map((rating, ratingIndex) => (
                                                                                <label key={ratingIndex} className="mt-1 flex gap-2 items-center">
                                                                                    <input
                                                                                        type="radio"
                                                                                        name={`survey_${post.id}_${index}`}
                                                                                        value={rating}
                                                                                        className="radio radio-info"
                                                                                    />
                                                                                    <span>{rating}</span>
                                                                                </label>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                    {question.type === "openEnded" && (
                                                                        <textarea
                                                                            className="textarea textarea-info w-full mt-1"
                                                                            placeholder="Type your answer here"
                                                                            name={`survey_${post.id}_${index}`}
                                                                        ></textarea>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="flex justify-end mt-4 gap-2">
                                                            <button
                                                                className="btn btn-neutral"
                                                                onClick={() => document.getElementById(`survey_modal_${post.id}`).close()}
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button type="submit" className="btn btn-primary">
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </dialog>
                                        </div>
                                    )}

                                </div>

                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}

export default General;
