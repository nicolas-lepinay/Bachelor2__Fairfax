import "./feed.css"
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import Share from "../share/Share"
import Post from "../post_old/Post"
import { UserContext } from "../../context/UserContext";

export default function Feed({username, socket}) {

    const [posts, setPosts] = useState([]);
    const { user } = useContext(UserContext)

    // Si Feed a un username en argument, fetch les posts du user pour la page de profile. Sinon, fetch Timeline
    useEffect ( () => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get(`/api/posts/profile/${username}`) 
                : await axios.get(`/api/posts/timeline/${user._id}`);
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt); // Tri du plus récent au plus ancien
            }));
        }
        fetchPosts();
    }, [username, user._id])

    return (
        <div className="feed">
            <div className="feedWrapper">
                
                {(!username || username === user.username) && <Share/>}

                {/* Pour chaque post p de la data Posts, je return un <Post/> : */}
                {posts.map((p) => (
                    <Post key={p._id} post={p} socket={socket}/>
                ))}
            </div>
        </div>
    )
}
