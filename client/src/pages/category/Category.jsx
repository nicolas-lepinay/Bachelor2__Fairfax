// 🌌 React :
import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

// 🚧 React Components :
import Post from '../../components/category/post/Post.jsx';
import Navbar from "../../components/navbar/Navbar";
import NewPost from "../../modals/newPost/NewPost.jsx";

// 💅🏻 Styled Components :
import { Wrapper, NewPostButton, Container, Grid, Center, Button } from './Category.styled';

// 🎬 Framer Motion :
import { AnimatePresence } from 'framer-motion';

// 🅰️ Axios :
import axios from "axios";

function Category({socket}) {
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    const slug = useParams().slug;

    const [category, setCategory] = useState({});
    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(5);
    const [end, setEnd] = useState(false);

    const scrollRef = useRef(null);

    // Is 'NEW POST' open ? :
    const [newPostOpen, setNewPostOpen] = useState(false);

    // 🚧 Fetch category's name and id :
    useEffect ( () => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`/categories?slug=${slug}`);
                setCategory(res.data);

            } catch(err) {
                console.log(err);
                history.push('/home');
            }
        }
        fetchCategory();
    }, [slug])

    // ✉️ Fetch posts (when category changes) :
    useEffect ( () => {
        const fetchPosts = async () => {
            const res = await axios.get(`/posts/category/${category._id}?skip=${skip}&limit=${limit}`);
            setPosts(res.data);
        }
        setSkip(0);
        setEnd(false);
        fetchPosts();
    }, [category]);

    // ✉️ Fetch posts (load more posts) :
    useEffect ( () => {
        const fetchPosts = async () => {
            const res = await axios.get(`/posts/category/${category._id}?skip=${skip}&limit=${limit}`);
            res.data.map((post) => {
                setPosts(old => [...old, post])
            })
            scrollRef.current?.scrollIntoView({behavior: "smooth"}) // 🖱️ Scroll to last message
            res.data.length < limit ? setEnd(true) : setEnd(false); // No more posts to load
        }
        skip > 0 && fetchPosts();
    }, [category, skip, limit]);

    // Open New Post modal :
    const openModal = () => {
        setNewPostOpen(true);
        document.getElementById('root').style.transition = '0.8s filter ease-in-out';
        document.getElementById('root').style.filter = 'blur(5px) brightness(30%)';
    }

    // Close New Post modal :
    const closeModal = () => {
        setNewPostOpen(false);
        document.getElementById('root').style.filter = 'blur(0px) brightness(1)';
    }

    return (
        <>
            <Wrapper>
                <Navbar socket={socket} />
                <NewPostButton onClick={openModal}>+</NewPostButton>
                <Container>
                    <h1>Welcome to the {category.name}</h1>
                    <Grid>
                        {posts.map( (post, i) => (
                            <Post key={`category-post-card${post._id}`} post={post} i={i} />
                        ))}
                    </Grid>
                    <Center>
                        {!end &&
                        <div ref={scrollRef}>
                            <Button onClick={() => setSkip(skip + limit)}>Voir plus</Button>
                        </div>
                        }
                    </Center>
                </Container>
            </Wrapper>

            {/* NEW POST MODAL */}
            <AnimatePresence 
                initial={false} 
                exitBeforeEnter={true} 
                onExitComplete={() => null}
            >
            {newPostOpen && <NewPost handleClose={closeModal} category={category} />}
            </AnimatePresence>

        </>
    )
}

export default Category
