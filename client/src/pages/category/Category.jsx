// 🌌 React :
import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

// 🚧 React Components :
import Post from '../../components/category/post/Post.jsx';
import Navbar from "../../components/navbar/Navbar";
import NewPost from "../../modals/newPost/NewPost.jsx";

// 💅🏻 Styled Components :
import { Wrapper, NewPostButton, Container, Banner, Title, Image, Logo, Bottom, Overlay, MainContent, Grid, Center, Button } from './Category.styled';

// 🎬 Framer Motion :
import { AnimatePresence } from 'framer-motion';

// 🅰️ Axios :
import axios from "axios";

function Category({socket}) {
    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;

    const slug = useParams().slug;
    const history = useHistory();

    const [category, setCategory] = useState({});
    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(5);
    const [end, setEnd] = useState(false);

    const [showNavbar, setShowNavbar] = useState(false);
    const [mousePosition, setMousePosition] = useState({left: 100});

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

    // 🖥️ Scroll to top of the page (and resets parameters) :
    useEffect( () => {
        window.scrollTo(0, 0);
        setSkip(0);
        setEnd(false);
    }, [slug]);

    // ✉️ Fetch posts (when category changes) :
    useEffect ( () => {
        const fetchPosts = async () => {
            const res = await axios.get(`/posts/category/${category._id}?skip=${skip}&limit=${limit}`);
            setPosts(res.data);
        }
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

    // Show navbar below the category name :
    useEffect(() => {
        const title = document.getElementById('title__category');

        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return rect.bottom > 0;
        }
        const onScroll = () => isInViewport(title) ? setShowNavbar(false) : setShowNavbar(true);
        // clean up code :
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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

    // Show nav bar when cursor goes to left :
    const handleMouseMove = (event) => { 
        setMousePosition({left: event.pageX});
    }

    return (
        <>
            <NewPostButton onClick={openModal}>+</NewPostButton>
            <Wrapper onMouseMove={ (event) => handleMouseMove(event) }>
                <Navbar socket={socket} visible={showNavbar || mousePosition.left < 90} />
                <Container>
                    <Banner>
                        {/* <Logo src={`${ASSETS}/logo_gold.png`} id="title__logo"/> */}
                        <Title id="title__category">The {category?.name}</Title>
                        <Overlay src={`${ASSETS}/fog_lg.png`}/>
                        <Image src={category?.images && category?.images[0] ? `${ASSETS}/categories/${category?.images[0]}` : `${ASSETS}/home/banner_3.png`} />
                        <Bottom src={`${ASSETS}/wave_white.png`} />
                    </Banner>
                    
                    <MainContent>
                        {/* <h1>Welcome to the {category.name}</h1> */}
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
                    </MainContent>
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
