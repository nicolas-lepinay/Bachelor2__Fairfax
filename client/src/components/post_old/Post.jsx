import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import "./post.css"
import { MoreVert } from "@material-ui/icons"
import { UserContext } from "../../context/UserContext"
import { io } from "socket.io-client";
import axios from "axios";
import { format } from "timeago.js";

export default function Post({post, socket}) {

    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;
    
    const { user: currentUser } = useContext(UserContext); // On donne l'alias currentUser à user, car user existe déjà plus bas (c'est l'auteur du post)
    const [user, setUser] = useState({});
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    const [comme , setComm] = useState([]);
    
    // ❤️ Set isLiked :
    useEffect ( () => {
        setIsLiked(post.likes.includes(currentUser._id)) // Si l'array de likes comporte le currentUser -> true, sinon false.
    }, [currentUser._id, post.likes])
    
    // 🦸‍♀️ Fetch post's author :
    useEffect ( () => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId])
    
    const likeHandler = () => {
        try {
            axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
        } catch(err) {
            console.log(err)
        }
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
        !isLiked && sendNotification('like');
    }

    const sendNotification = (type) => {
        socket?.emit('sendNotification', {
            sender: currentUser,
            receiverId: post.userId, // ou user._id
            post: post,
            type: type,
        });
    }


    // COMMENTAIRES :
    // const ajoutcomm = () => {
    //     const pos = document.getElementById('');
    // } 

    // useEffect ( () => {
    //     const fetchComme = async () => {
    //         const res = await axios.get(`/posts/${post._id}/comments`);
    //         setComm(res.data);
    //     }
    //     fetchComme();
    // }, [])

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img className="postProfileImg" src={user.avatar ? `${MEDIA}/profile/${user.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`} alt="" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>

                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.content}</span>
                    {post.img && <img className="postImg" src={`${MEDIA}/post/${post?.img}`} alt="" /> }
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {/*<img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="Like" />*/}
                        <img className="likeIcon" src={`${ASSETS}/Heart.png`} onClick={likeHandler} alt="Heart" />
                        <span className="postLikeCounter">{like}</span>
                    </div>
                    {/* <div className="postBottomRight">
                        <span className="postCommentText">{post?.comments.length} comments</span>
                    </div> */}
                </div>
                
                {/* <div className="comme">
                    <button className="commebtn">Commentaire</button>
                    <div className="commeall">
                        {comme.map((r)=>(
                            <div><p>{r.content}</p> <p id="rep">{r.postId}</p> </div> 
                        )
                        )}
                    </div>
                    <label htmlFor="">Commentaire</label>
                    <input type="text" id="comme" />
                    <button>envoie</button>
                </div> */}

            </div>
        </div>
    )
}