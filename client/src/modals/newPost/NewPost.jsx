// 🌌 React :
import { useState, useEffect, useRef, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

// ✨ Portal :
import ReactDom from 'react-dom';

// 💅🏻 Styled components :
import { wrapperStyle, editorStyle, toolbarStyle, dropIn, Backdrop, ModalContainer, Title } from "./NewPost.styled"

// 🦸‍♀️ User Context :
import { UserContext } from "../../context/UserContext";

// 📝 Draft.js EditorState :
import { EditorState, convertToRaw } from 'draft-js';

// 📋 React-Draft-Wysiwyg Text Editor and Styles :
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// 🎬 Framer Motion :
import { motion } from 'framer-motion';

// 🅰️ Axios :
import axios from "axios";

function NewPost({ handleClose, category }) {

    // Logged-in user :
    const {user} = useContext(UserContext);

    const history = useHistory();

    // Draft.js text editor :
    const [editorState, setEditorState] = useState( () => EditorState.createEmpty() );

    // Is the post / post's title long enough :
    const [isValid, setIsValid] = useState(false);

    // Refs :
    const modalWrapper = useRef();
    const titleRef = useRef();
    const [title, setTitle] = useState("");

    // Text editor toolbar options :
    const toolbarOptions = {
        options: ['inline', 'list', 'fontSize', 'link', 'emoji', 'image', 'remove', 'history'], 
        inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
            },
        fontSize: { options: [12, 15, 20] },
    }

    const checkValid = (titleText) => {
        let content = editorState.getCurrentContent().getPlainText('\u0001').trim();
        // let title = titleRef.current.value.trim();

        content.length > 10 && content.length < 5000 && title.trim().length > 10 && title.trim().length < 100 ? setIsValid(true) : setIsValid(false);
    }

    // onSubmit handler function :
    const submitHandler = async (e) => {
        e.preventDefault();

        // Draft.js content state :
        const draftData = editorState.getCurrentContent();
        // JSON string :
        const jsonData = JSON.stringify(convertToRaw(draftData));

        var newPost = {
            userId: user._id,
            categoryId: category._id,
            title: titleRef.current.value,
            content: jsonData,
        }

        // if(file) {
        //     const formData = new FormData();
        //     const date = new Date(Date.now()).toISOString().replaceAll(':', '-'); // 2022-12-25T18-30-00.000Z
            
        //     const fileName = date + "_" + file.name;
        //     formData.append("name", fileName);
        //     formData.append("file", file);
        //     newPost.img = fileName;
        //     try {
        //         await axios.post("/upload", formData)
        //     } catch (err) {
        //         console.log(err)
        //     }
        // }

        try {
            const res = await axios.post("/posts", newPost);
            history.push(`${category.slug}/${res.data?.slug}`)
            handleClose();
        } catch (err) {
            console.log(err);
        }
    }

    return ReactDom.createPortal (
            <Backdrop onClick={handleClose}>
                <motion.div
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                        <ModalContainer onClick={ (e) => e.stopPropagation() } >
                            <svg 
                                width="20px" 
                                height="20px" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg" 
                                onClick={handleClose}
                                >
                                <path fill="none" stroke="#000000" strokeWidth={2} d="M3,3 L21,21 M3,21 L21,3"/>
                            </svg>

                            <h2>Publish a new fax</h2>
                            <p>In the {category.name}</p>
                            <form onSubmit={submitHandler} style={{display:'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center', gap: '0rem'}}>
                                <Title type="text" maxLength="80" placeholder="Type a title..." onChange={(e) => { setTitle(e.target.value); checkValid() } }/>
                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={setEditorState}
                                    wrapperStyle={wrapperStyle}
                                    editorStyle={editorStyle}
                                    editorClassName="editor-class first-letter"
                                    toolbarStyle={toolbarStyle}
                                    toolbar={toolbarOptions}
                                    stripPastedStyles={true}
                                    placeholder={`Write a new fax...`}
                                    onContentStateChange={checkValid}
                                />
                                <button type="submit" disabled={!isValid}>Publish</button>
                            </form>
                        </ModalContainer>
                </motion.div>
            </Backdrop>,
        document.getElementById('portal')
    )
}

export default NewPost;
