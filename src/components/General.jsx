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
        </>
    )
}

export default General;