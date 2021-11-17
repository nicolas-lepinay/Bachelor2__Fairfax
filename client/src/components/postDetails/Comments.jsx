import './comments.css';

export default function Comments() {
    
    return (
        <div className="comments-container">
            <div className="comment">
                <div className="comment-userInfo">
                    <img className="comment-profilePicture" src="https://source.unsplash.com/50x50" alt="avatar" />
                    <div>
                    <p className="comment-profileName">Jonh Doe</p>
                    <p className="comment-postedAt">17/11/2021 13:25:40</p>
                    </div>
                </div>
                <div className="comment-content">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas eaque nostrum atque esse voluptate est natus, quasi vitae numquam recusandae sed excepturi! Corporis nostrum, dignissimos est quia a consectetur molestias.</p>
                </div>
                <div className="comment-interactions">
                    <p className="comment-interactions-replies">1 Reply</p>
                    <div className="interactions-right">
                    <div className="comment-interaction">
                        <p>2</p>
                        <img src="assets/postDetails/like.png" alt="" />
                    </div>
                        <img id="needInvert" className="comment-interaction" src="assets/postDetails/bookmark.png" alt="Bookmark" />
                        <p className="comment-interaction" >Reply</p>
                    </div>
                </div>
            </div>
            <div className="comment">
                <div className="comment-userInfo">
                    <img className="comment-profilePicture" src="https://source.unsplash.com/50x50" alt="avatar" />
                    <div>
                    <p className="comment-profileName">Jean Doe</p>
                    <p className="comment-postedAt">18/11/2021 08:25:40</p>
                    </div>
                </div>
                <div className="comment-content">
                    <p>Lorem ipsum dolor, sit amet consectetur molestias.</p>
                </div>
                <div className="comment-interactions">
                    <p className="comment-interactions-replies">3 Reply</p>
                    <div className="interactions-right">
                    <div className="comment-interaction">
                        <p>5</p>
                        <img src="assets/postDetails/like.png" alt="" />
                    </div>
                        <img id="needInvert" className="comment-interaction" src="assets/postDetails/bookmark.png" alt="Bookmark" />
                        <p className="comment-interaction" >Reply</p>
                    </div>
                </div>
            </div>
        </div>
    )
}