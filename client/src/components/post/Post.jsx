// 🌌 React :
import { useState, useEffect, useRef, useContext } from 'react'
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";

// 💅🏻 Styled Components :
import { MATERIAL_STYLE, Container, Title, Author, Content, Interactions, Button, Information, HeartContainer, HeartWrapper } from './Post.styled';

// 🚧 React Component :
import HeartAnimation from '../HeartAnimation/HeartAnimation.jsx';

// 🦸‍♀️ User Context :
import { UserContext } from "../../context/UserContext";

// 📝 Draft.js EditorState :
import { EditorState, convertFromRaw } from 'draft-js';

// 📋 React-Draft-Wysiwyg Text Editor and Styles :
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// ❤️ MaterialUI Icons :
import { Fullscreen, FullscreenExit, Reply } from '@material-ui/icons';

// ⌛ Timeago.js :
import { format } from "timeago.js";

// 🅰️ Axios :
import axios from "axios";

function Post({ post, comments, author, socket, toggleReply, setToggleReply, openLogin, fullWidth, setFullWidth }) {
    
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    // Logged-in user :
    const {user} = useContext(UserContext);

    const [atBottom, setAtBottom] = useState(false);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const [likeCounter, setLikeCounter] = useState(post?.likes?.length || 0);
    const [isLiked, setIsLiked] = useState(false);

    // Send post's content to read-only text-editor :
    useEffect(() => {
        post?.content && setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(post?.content))));
    }, [post]);

    // ❤️ Set isLiked :
    useEffect ( () => {
        post?.likes && setIsLiked(post?.likes.some(like => like.userId === user?._id));
    }, [user?._id, post.likes])

    // ❤️ Set like counter :
    useEffect ( () => {
        post?.likes && setLikeCounter(post?.likes.length);
    }, [post.likes])

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        setAtBottom(bottom); 
    }

    const likeHandler = async () => {
        try {
            await axios.put(`/posts/${post._id}/like`, { userId: user?._id } );
        } catch(err) {
            console.log(err)
        }
        setLikeCounter(isLiked ? likeCounter-1 : likeCounter+1);
        setIsLiked(!isLiked);
        !isLiked && sendNotification('like');
    }

    const sendNotification = (type) => {
        socket?.emit('sendNotification', {
            sender: user,
            receiverId: post.userId, // ou author._id
            post: post,
            type: type,
        });
    }

    return (
        <Container>
            <Title>{post.title}</Title>

            <Author>
                <Link to={`/profile/${author?.slug || author.username}`} style={{textDecoration: 'none'}}>
                    <img src={`${MEDIA}/profile/${author.avatar || 'defaultAvatar.jpg'}`} className="avatar" />
                </Link>
                <h4>{author.username}</h4>
            </Author>

            {/* <Content onScroll={handleScroll} className={atBottom && "at-bottom"}>{post.content} {post.content} {post.content}</Content> */}
            <Content onScroll={handleScroll} className={atBottom && "at-bottom"}>
                <Editor 
                    editorState={editorState}
                    readOnly={true} 
                    editorClassName="editor-class first-letter"
                    toolbarStyle={{display: 'none'}}
                />
            </Content>

            <Interactions>

                <HeartContainer onClick={user ? likeHandler : openLogin}>
                    {likeCounter}
                    <HeartWrapper style={{width: '80px', height: '80px'}}>
                        <HeartAnimation ratio={80} liked={isLiked} />
                    </HeartWrapper>
                </HeartContainer>

                <Button onClick={ () => setFullWidth(!fullWidth)}>
                    {fullWidth ? <FullscreenExit/> : <Fullscreen/> }
                </Button>

                <Button className="purple" onClick={() => user ? setToggleReply(!toggleReply) : openLogin() }>
                    <Reply/><span>Reply</span>
                </Button>
                
            </Interactions>

            <Information>
                <div>
                    <h4>Published</h4>
                    <p>{format(post.createdAt)}</p>
                </div>

                <div>
                    <h4>Views</h4>
                    <p>{post?.views?.length}</p>
                </div>

                <div>
                    <h4>Likes</h4>
                    <p>{likeCounter}</p>
                </div>
                
                <div>
                    <h4>Replies</h4>
                    <p>{comments.length}</p>
                </div>
            </Information>
        </Container>
    )}

export default Post;
