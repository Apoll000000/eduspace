import './styles/General.css';
import send from "../assets/send.png";

function General() {
    return (
        <>
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

            <div className="post">
                <div className="post-author">
                    <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt="author" />
                    <h4>Patrick Paul Leonen</h4>
                </div>

                <div className="post-content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro odio optio enim. Minima, at consequuntur odio, fugiat quas natus ipsa amet rem in, magni cumque. Quasi voluptatibus omnis sit modi?</p>
                </div>

                <div className="post-buttons">
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

            <div className="post">
                <div className="post-author">
                    <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt="author" />
                    <h4>Patrick Paul Leonen</h4>
                </div>

                <div className="post-content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro odio optio enim. Minima, at consequuntur odio, fugiat quas natus ipsa amet rem in, magni cumque. Quasi voluptatibus omnis sit modi?</p>
                </div>

                <div className="post-buttons">
                    <div className="collapse comments">
                        <input type="checkbox" />
                        <div className="collapse-title text-s font-medium">View Poll</div>
                        <div className="collapse-content">
                            <div className="poll">
                                <h3>This is a poll option</h3>
                                <progress className="progress progress-info w-full" value={0} max="100"></progress>
                            </div>

                            <div className="poll">
                                <h3>This is a poll option</h3>
                                <progress className="progress progress-info w-full" value="10" max="100"></progress>
                            </div>

                            <div className="poll">
                                <h3>This is a poll option</h3>
                                <progress className="progress progress-info w-full" value="40" max="100"></progress>
                            </div>

                            <div className="poll">
                                <h3>This is a poll option</h3>
                                <progress className="progress progress-info w-full" value="70" max="100"></progress>
                            </div>

                            <div className="poll">
                                <h3>This is a poll option</h3>
                                <progress className="progress progress-info w-full" value="100" max="100"></progress>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="post">
                <div className="post-author">
                    <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt="author" />
                    <h4>Patrick Paul Leonen</h4>
                </div>

                <div className="post-content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro odio optio enim. Minima, at consequuntur odio, fugiat quas natus ipsa amet rem in, magni cumque. Quasi voluptatibus omnis sit modi?</p>
                </div>

                <div className="post-buttons" onClick={() => document.getElementById('survey_modal').showModal()}>
                    <div className="collapse comments survey">
                        <input type="checkbox" />
                        <div className="collapse-title text-s font-medium">View Survey</div>
                    </div>
                </div>

            </div>

            <dialog id="survey_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <h3 className="font-bold text-lg">User's Survey</h3>
                        <p className="py-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste et ullam deleniti fuga aperiam accusantium doloremque enim! Commodi in, vero quidem ipsam, expedita a facere accusamus nisi eaque fugiat error.</p>
                        <div className="survey_body">
                            <div className="squestion survey_bool">
                                <h4>This is a survey question</h4>
                                <div className="survey_option flex gap-2">
                                    <input type="radio" name="radio-7" className="radio radio-info" />
                                    <h2>Yes</h2>
                                </div>
                                <div className="survey_option flex gap-2">
                                    <input type="radio" name="radio-7" className="radio radio-info" />
                                    <h2>No</h2>
                                </div>
                            </div>
                            
                            <div className="squestion survey_rating">
                                <h4>This is a survey question</h4>
                                <div className="survey_option flex gap-2">
                                    <input type="radio" name="radio-7" className="radio radio-info" />
                                    <h2>1 - Poor</h2>
                                </div>
                                <div className="survey_option flex gap-2">
                                    <input type="radio" name="radio-7" className="radio radio-info" />
                                    <h2>2 - Fair</h2>
                                </div>
                                <div className="survey_option flex gap-2">
                                    <input type="radio" name="radio-7" className="radio radio-info" />
                                    <h2>3 - Neutral</h2>
                                </div>
                                <div className="survey_option flex gap-2">
                                    <input type="radio" name="radio-7" className="radio radio-info" />
                                    <h2>4 - Good</h2>
                                </div>
                                <div className="survey_option flex gap-2">
                                    <input type="radio" name="radio-7" className="radio radio-info" />
                                    <h2>5 - Excellent</h2>
                                </div>
                            </div>

                            <div className="squestion survey_open-ended">
                                <h4>This is a survey question</h4>
                                <textarea className="textarea textarea-info w-full" placeholder="Type your answer here"></textarea>
                            </div>

                            <div className="flex justify-end mt-2 w-full gap-2">
                                <button type="button" className="btn btn-neutral" onClick={() => document.getElementById('survey_modal').close()}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </dialog>
        </>
    )
}

export default General;