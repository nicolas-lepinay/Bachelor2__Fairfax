import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

import "./post.css"
import { MoreVert } from "@material-ui/icons"
import { AuthContext } from "../../context/AuthContext"

export default function Post({post}) {

    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)

    const { user: currentUser } = useContext(AuthContext); // On donne l'alias currentUser à user, car user existe déjà plus bas (c'est l'auteur du post)

    const likeHandler = () => {
        try {
            axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
        } catch(err) {

        }
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }

    useEffect ( () => {
        setIsLiked(post.likes.includes(currentUser._id)) // Si l'array de likes comporte le currentUser -> true, sinon false.
    }, [currentUser._id, post.likes])

    const [user, setUser] = useState({});

    useEffect ( () => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId])

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img className="postProfileImg" src={user.avatar ? `${MEDIA}/${user.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`} alt="" />
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
                    <img className="postImg" src={`${MEDIA}/post/${post?.img}`} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {/*<img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="Like" />*/}
                        <img className="likeIcon" src={`${ASSETS}/Heart.png`} onClick={likeHandler} alt="Heart" />
                        <span className="postLikeCounter">{like}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post?.comments.length} comments</span>
                    </div>

                </div>
            </div>
        </div>
    )
}
