// 🌌 React :
import { useState, useContext, useEffect, useRef } from 'react'
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";

// 🚧 React Component :
import SingleComment from "./SingleComment.jsx";

// 💅🏻 Styled Components and Styles for the text editor :
import { wrapperStyle, editorStyle, toolbarStyle, toolbarOptions, Container, NoComment } from './Comments.styled';

// 🦸‍♀️ User Context :
import { UserContext } from "../../context/UserContext";

// 📝 Draft.js EditorState :
import { EditorState, convertToRaw } from 'draft-js';

// 📋 React-Draft-Wysiwyg Text Editor and Styles :
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// 🅰️ Axios :
import axios from "axios";

export default function Comments({ postId, comments, author, socket, toggleReply, setToggleReply, setPost, openLogin }) {

    // Logged-in user :
    const {user} = useContext(UserContext);

    // Is viewport is at bottom (for overlay gradient over text) :
    const [atBottom, setAtBottom] = useState(false);

    // Is comment valid (length) :
    const [isValid, setIsValid] = useState(false);

    // Draft.js text editor :
    const [editorState, setEditorState] = useState( () => EditorState.createEmpty() );

    // Scroll ref :
    const scrollRef = useRef(null);

    useEffect( () => {
        toggleReply && scrollRef.current?.scrollIntoView({behavior: "smooth"}) // 🖱️ Scroll to Draft.js text editor :
    } );


    // Check if viewport is at bottom (for overlay gradient over text) :
    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        setAtBottom(bottom ? true : false); 
    }

    const checkValid = () => {
        let content = editorState.getCurrentContent().getPlainText('\u0001').trim();
        content.length > 2 && content.length < 5000 ? setIsValid(true) : setIsValid(false);
    }

    // onSubmit handler function :
    const submitHandler = async (e) => {
        e.preventDefault();

        // Draft.js content state :
        const draftData = editorState.getCurrentContent();
        // JSON string :
        const jsonData = JSON.stringify(convertToRaw(draftData));

        let newComment = {
            userId: user._id,
            postId: postId,
            content: jsonData,
        }
        try {
            await axios.post("/comments", newComment);              // Publish comment
            const res = await axios.get(`/posts?id=${postId}`);     // Re-fetch post to update comments
            setPost(res.data); 
            setToggleReply(false);
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <Container onScroll={handleScroll} className={atBottom && "at-bottom"} >
            {comments.map( (comment) => {
                if(!comment.commentId || comment?.commentId === '') {
                    return <SingleComment comment={comment} author={author} socket={socket} setPost={setPost} openLogin={openLogin} key={`comment-${comment._id}`} />
                }
            })}
            {comments.length === 0 && <NoComment>Be the first one to reply.</NoComment>}
            {
                toggleReply &&
                    <form onSubmit={submitHandler} ref={scrollRef}>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            wrapperStyle={wrapperStyle}
                            editorStyle={editorStyle}
                            toolbarStyle={toolbarStyle}
                            toolbar={toolbarOptions}
                            placeholder={`Write a reply...`}
                            onContentStateChange={checkValid}
                        />
                        <button type="submit" disabled={!isValid}>Publish</button>
                    </form>
            }
        </Container>
    )
}