// 🌌 React :
import { useState, useEffect, useLayoutEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

// 💅🏻 Styled Components :
import { Card, Image, FlexBox, Name, Info, Title, Content } from './Post.styled';

// 📝 Draft.js EditorState :
import { EditorState, convertFromRaw } from 'draft-js';

// 📋 React-Draft-Wysiwyg Text Editor and Styles :
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// 🅰️ Axios :
import axios from "axios";

function Post({ post, i }) {

    // 🖥️ Get window size :
    // const useWindowSize = () => {
    //     const [size, setSize] = useState([0, 0]);
    //     useLayoutEffect(() => {
    //       const updateSize = () => {
    //         setSize([window.innerWidth, window.innerHeight]);
    //       };
    //       window.addEventListener("resize", updateSize);
    //       updateSize();
    //       return () => window.removeEventListener("resize", updateSize);
    //     }, []);
    //     return size;
    //   };

    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;
    const history = useHistory();
    const slug = useParams().slug;

    // const { user } = useContext(UserContext);
    const [author, setAuthor] = useState({});
    // const [width, height] = useWindowSize();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    // 🦸‍♀️ Fetch post's author :
    useEffect ( () => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setAuthor(res.data);
        }
        fetchUser();
    }, [post.userId]);

    // Send post's content to EditorState :
    useEffect(() => {
        post?.content && setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(post?.content))));
    }, [post]);

    // ➡️ Redirect to post page :
    const handleRedirection = () => {
        history.push(`${slug}/${post?.slug}`);
    }

    return (
            <Card onClick={() => handleRedirection()} >
                <FlexBox>
                    <div>
                        <Image src={author.avatar ? `${MEDIA}/profile/${author.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`} alt="Avatar"/>
                    </div>
                    <div>
                        <Name>{author.username}</Name>
                        <Info>Member</Info>
                    </div>
                </FlexBox>
                <Title>{post.title}</Title>
                <Content>
                    {editorState.getCurrentContent().getPlainText('\u0001')}
                    {/* <Editor 
                        editorState={editorState}
                        readOnly={true} 
                        wrapperStyle={{display: 'none'}}
                    /> */}
                </Content>
            </Card>
    )
}

export default Post
