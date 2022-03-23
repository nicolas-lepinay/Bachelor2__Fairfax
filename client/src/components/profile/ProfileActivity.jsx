// 🌌 React :
import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';

// 🚧 React Component :
import PostActivity from './ProfileActivity/PostActivity.jsx';
import CommentActivity from './ProfileActivity/CommentActivity.jsx';

// 💅🏻 Styled Components :
import { Container, Header, NoContent } from './ProfileActivity.styled';

// 🦸 UserContext :
import { UserContext } from "../../context/UserContext";

// 🅰️ Axios :
import axios from "axios";

function ProfileActivity({ profileUser }) {

    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;
    
    // 🦸 User Context :
    const { user, setUser } = useContext(UserContext);

    const [section, setSection] = useState('posts');
    const [posts, setPosts] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect ( () => {
        // Fetch posts written by profileUser :
        const fetchPosts = async () => {
            const res = await axios.get(`/posts/userId/${profileUser._id}`);
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt); // Tri du plus récent au plus ancien
            }));
        }
        // Fetch posts liked by profileUser :
        const fetchFavourites = async () => {
            const res = await axios.get(`/posts/like/${profileUser._id}`);
            setFavourites(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt); // Tri du plus récent au plus ancien
            }));
        }
        // Fetch comments written by profileUser :
        const fetchComments = async () => {
            const res = await axios.get(`/comments/userId/${profileUser._id}`);
            setComments(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt); // Tri du plus récent au plus ancien
            }));
        }
        fetchPosts();
        fetchFavourites();
        fetchComments();
    }, [profileUser])

    return (
        <Container>
            <Header>
                <button 
                    onClick={() => setSection('favourites')}
                    className={section == 'favourites' ? 'active' : ''} >
                    Favourites
                </button>

                <button 
                    onClick={() => setSection('posts')}
                    className={section == 'posts' ? 'active' : ''} >
                    My faxes
                </button>

                <button 
                    onClick={() => setSection('comments')}
                    className={section == 'comments' ? 'active' : ''} >
                    Replies
                </button>
            </Header>

            { section == 'posts' &&
                <PostActivity posts={posts} profileUser={profileUser} />
            }
            { section == 'posts' && posts.length === 0 &&
                <NoContent>{user?._id === profileUser ? `You haven't posted any fax yet.` : `${profileUser.username} hasn't posted any fax yet.`}</NoContent>
            }

            { section == 'favourites' &&
                <PostActivity posts={favourites} />
            }
            { section == 'favourites' && favourites.length === 0 &&
                <NoContent>{user?._id === profileUser ? `You don't have any favourite yet.` : `${profileUser.username} doesn't have any favourite yet.`}</NoContent>
            }

            { section == 'comments' &&
                <CommentActivity comments={comments} profileUser={profileUser} />
            }
            { section == 'comments' && comments.length === 0 &&
                <NoContent>{user?._id === profileUser ? `You haven't replied to any fax yet.` : `${profileUser.username} hasn't replied to any fax yet.`}</NoContent>
            }

        </Container>
    )
}

export default ProfileActivity