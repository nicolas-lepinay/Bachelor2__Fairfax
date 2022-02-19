// 🌌 React :
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";

// 🚧 React Components :
import Navbar from "../../components/navbar/Navbar";
import Post from "../../components/post/Post.jsx";
import Comments from "../../components/post/Comments.jsx";
import LoginModal from "../../modals/loginModal/LoginModal.jsx";

// 💅🏻 Styled Components :
import { Wrapper, Container } from './PostPage.styled';

// 🦸‍♀️ User Context :
import { UserContext } from "../../context/UserContext";

// 🎬 Framer Motion :
import { AnimatePresence } from 'framer-motion';

// 🅰️ Axios :
import axios from "axios";

function PostPage({socket}) {

    const postSlug = useParams().postSlug;
    const categorySlug = useParams().categorySlug;
    const history = useHistory();

    // Logged-in user :
    const {user} = useContext(UserContext);

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [author, setAuthor] = useState({});

    const [toggleReply, setToggleReply] = useState(false);

    const [fullWidth, setFullWidth] = useState(false);

    // 🗝️ Is 'LOGIN MODAL' open ? :
    const [loginOpen, setLoginOpen] = useState(false);

    // Check if page was refreshed or not :
    const isReloaded = (
        (window.performance.navigation && window.performance.navigation.type === 1) ||
          window.performance
            .getEntriesByType('navigation')
            .map((nav) => nav.type)
            .includes('reload')
    );

    // Open Login modal :
    const openLogin = () => {
        setLoginOpen(true);
        document.getElementById('root').style.transition = '0.8s filter ease-in-out';
        document.getElementById('root').style.filter = 'blur(5px) brightness(30%)';
    }

    // Close Login modal :
    const closeLogin = () => {
        setLoginOpen(false);
        document.getElementById('root').style.filter = 'blur(0px) brightness(1)';
    }
      
    // Fetch post :
    useEffect ( () => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/posts?slug=${postSlug}`);
                setPost(res.data);
            } catch(err) {
                console.log(err);
                history.push('/home');
            }
        }
        fetchPost();
    }, [postSlug])

    // Fetch post's comments :
    useEffect ( () => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`/comments?postId=${post._id}`);
                setComments(res.data);
            } catch(err) {
                console.log(err)
            }
        }
        fetchComments();
    }, [post])

    // 🦸‍♀️ Fetch post's author :
    useEffect ( () => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users?userId=${post?.userId}`);
                setAuthor(res.data);
            } catch(err) {
                console.log(err)
            }
        }
        post.userId && fetchUser();
    }, [post.userId])

    // 👓 Increase post's views :
    useEffect ( () => {
        const increaseViews = async () => {
            const userId = user?._id || 'guest';
            try {
                await axios.put(`/posts/${post._id}/views`, { userId: userId } );
            } catch(err) {
                console.log(err)
            }
        }
        // Uniquement si le user est un invité ou différent de l'auteur, et si la page n'a pas été rechargée :
        post._id && (!user || user?._id != post.userId) && !isReloaded && increaseViews();
        
    }, [post._id])

    return (
        <>
            <Wrapper>
                <Navbar socket={socket} />
                <Container className={fullWidth ? "full-width" : ""} >
                    <Post post={post} comments={comments} author={author} socket={socket} toggleReply={toggleReply} setToggleReply={setToggleReply} openLogin={openLogin} fullWidth={fullWidth} setFullWidth={setFullWidth} />
                    <Comments postId={post._id} comments={comments} socket={socket} toggleReply={toggleReply} setToggleReply={setToggleReply} setPost={setPost} openLogin={openLogin} />
                </Container>

                {/* <Container>
                    <h1>TEST</h1>
                </Container> */}

            </Wrapper>

            {/* LOGIN MODAL */}
            <AnimatePresence 
                initial={false} 
                exitBeforeEnter={true} 
                onExitComplete={() => null}
            >
                {loginOpen && <LoginModal isOpen={loginOpen} handleClose={closeLogin} />}
            </AnimatePresence>
        </>
    )
}

export default PostPage