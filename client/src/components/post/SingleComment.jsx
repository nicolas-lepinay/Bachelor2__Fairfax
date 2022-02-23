// 🌌 React :
import { useState, useLayoutEffect, useEffect, useContext } from 'react'
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";

// 🚧 React Components :
import Subcomment from './Subcomment';
import HeartAnimation from '../HeartAnimation/HeartAnimation.jsx';

// 💅🏻 Styled Components :
import { wrapperStyle, editorStyle, toolbarStyle, toolbarOptions, MATERIAL_STYLE, Container, Author, Content, Interactions, DropdownTitle, Actions, Button, Replies, HeartContainer, HeartWrapper } from './SingleComment.styled';

// 🦸‍♀️ User Context :
import { UserContext } from "../../context/UserContext";

// 📝 Draft.js EditorState :
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

// 📋 React-Draft-Wysiwyg Text Editor and Styles :
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// ❤️ MaterialUI Icons :
import { KeyboardArrowDown, Favorite, Reply } from '@material-ui/icons';

// ⌛ Timeago.js :
import { format } from "timeago.js";

// 🅰️ Axios :
import axios from "axios";

function SingleComment({ comment, socket, setPost, openLogin }) {

    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    // Logged-in user :
    const {user} = useContext(UserContext);

    // Comment's author :
    const [author, setAuthor] = useState([]);

    // Subcomments :
    const [subcomments, setSubcomments] = useState([]);

    // Is accordion (subcomments) active :
    const [active, setActive] = useState(false);

    // Is accordion (subcomments) active :
    const [displayEditor, setDisplayEditor] = useState(false);

    // Like handling :
    const [likeCounter, setLikeCounter] = useState(comment?.likes?.length || 0);
    const [isLiked, setIsLiked] = useState(false);

    // Draft.js :
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [subEditorState, setSubEditorState] = useState(() => EditorState.createEmpty());

    // Is new subcomment valid (length) :
    const [isValid, setIsValid] = useState(false);

    useLayoutEffect(() => {
        Object.keys(comment).length > 0 && setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(comment?.content))));
    }, [comment]);

    // 🦸‍♀️ Fetch comment's author :
    useEffect ( () => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${comment.userId}`);
            setAuthor(res.data);
        }
        fetchUser();
    }, [comment])

    // ⤵️ Fetch comment's subcomments :
    useEffect ( () => {
        const fetchSubcomments = async () => {
            const res = await axios.get(`/comments?commentId=${comment._id}`);
            setSubcomments(res.data);
        }
        fetchSubcomments();
    }, [comment])

    // ❤️ Set isLiked :
    useEffect ( () => {
        comment?.likes && setIsLiked(comment?.likes.some(like => like.userId === user?._id));
    }, [user?._id, comment.likes])

    // ❤️ Set like counter :
    useEffect ( () => {
        comment?.likes && setLikeCounter(comment?.likes.length);
    }, [comment.likes])
    

    // 📜 Toggle accordion (show replies) :
    const showReplies = () => {
        setActive(!active);
        !active && setDisplayEditor(false);
    }

    // 📋 Show text editor :
    const showEditor = () => {
        setActive(true);
        setDisplayEditor(!displayEditor);
    }

    // Check if new subcomment is valid :
    const checkValid = () => {
        let content = editorState.getCurrentContent().getPlainText('\u0001').trim();
        content.length > 2 && content.length < 5000 ? setIsValid(true) : setIsValid(false);
    }

    // ❤️ Like handling :
    const likeHandler = async () => {
        try {
            await axios.put(`/comments/${comment._id}/like`, { userId: user._id } );
        } catch(err) {
            console.log(err)
        }
        setLikeCounter(isLiked ? likeCounter-1 : likeCounter+1);
        setIsLiked(!isLiked);
        // !isLiked && sendNotification('like');
    }

    // onSubmit handler function :
    const submitHandler = async (e) => {
        e.preventDefault();

        // Draft.js content state :
        const draftData = subEditorState.getCurrentContent();
        // JSON string :
        const jsonData = JSON.stringify(convertToRaw(draftData));

        let newSubcomment = {
            userId: user._id,
            postId: comment.postId,
            commentId: comment._id,
            content: jsonData,
        }
        try {
            await axios.post("/comments", newSubcomment);                   // Publish comment
            const res = await axios.get(`/posts?id=${comment.postId}`);     // Re-fetch post to update comments list
            setPost(res.data); 
            setDisplayEditor(false);                                        // Hide text editor
            setSubEditorState(EditorState.createEmpty());                   // Clear subcomment text editor
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <Author>
                <Link to={`/profile/${author?.slug || author.username}`}>
                    <img src={`${MEDIA}/profile/${author.avatar || 'defaultAvatar.jpg'}`} className="avatar" />
                </Link>
                <div>
                    <h4>{author.username}</h4>
                    <p className="date">{format(comment.createdAt)}</p>
                </div>
            </Author>

            <Content>
                <Editor 
                    editorState={editorState}
                    readOnly={true} 
                    toolbarStyle={{display: 'none'}}
                />
            </Content>

            <Interactions>
                {
                    subcomments.length > 0 &&
                        <DropdownTitle onClick={showReplies}>
                            <span>{subcomments.length} replies</span>
                            <KeyboardArrowDown style={active ? MATERIAL_STYLE.ARROW_UP : MATERIAL_STYLE.ARROW_DOWN}/>
                        </DropdownTitle>
                }
                
                <Actions>

                    <HeartContainer onClick={user ? likeHandler : openLogin}>
                        {likeCounter}
                        <HeartWrapper style={{width: '65px', height: '65px'}}>
                            <HeartAnimation ratio={65} liked={isLiked} />
                        </HeartWrapper>
                    </HeartContainer>

                    {/* <Button>{comment?.likes.length} <Favorite style={{color: 'crimson'}}/></Button> */}

                    <Button onClick={user ? showEditor : openLogin}><Reply/><span>Reply</span></Button>
                </Actions>
            </Interactions>

            <Replies className={active ? "show" : ""}>
                {
                    displayEditor &&
                    <form onSubmit={submitHandler}>
                        <Editor
                            editorState={subEditorState}
                            onEditorStateChange={setSubEditorState}
                            wrapperStyle={wrapperStyle}
                            editorStyle={editorStyle}
                            toolbarStyle={toolbarStyle}
                            toolbar={toolbarOptions}
                            placeholder={`Write a reply...`}
                            onContentStateChange={checkValid}
                        />
                        <button type="submit" style={{margin: '1rem 0 1rem 0'}}>Publish</button>
                    </form>
                }
                {subcomments.map( (subcomment) => (
                    <Subcomment subcomment={subcomment} openLogin={openLogin} key={`subcomment-${subcomment._id}`} />
                ))}

            </Replies>
        </Container>
    );
}

export default SingleComment;
