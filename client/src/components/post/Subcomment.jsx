// 🌌 React :
import { useState, useLayoutEffect, useEffect, useContext } from 'react'
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";

// 🚧 React Components :
import HeartAnimation from '../HeartAnimation/HeartAnimation.jsx';

// 💅🏻 Styled Components :
import { Single, Author, HeartContainer, HeartWrapper } from './Subcomment.styled';

// 🦸‍♀️ User Context :
import { UserContext } from "../../context/UserContext";

// 📝 Draft.js EditorState :
import { EditorState, convertFromRaw } from 'draft-js';

// 📋 React-Draft-Wysiwyg Text Editor and Styles :
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// ❤️ MaterialUI Icons :
import { KeyboardArrowDown, Favorite, Reply } from '@material-ui/icons';

// ⌛ Timeago.js :
import { format } from "timeago.js";

// 🅰️ Axios :
import axios from "axios";

function Subcomment({ subcomment, openLogin }) {

    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    // Logged-in user :
    const {user} = useContext(UserContext);

    // Subcomment's author :
    const [author, setAuthor] = useState([]);

    // Like handling :
    const [likeCounter, setLikeCounter] = useState(subcomment?.likes?.length || 0);
    const [isLiked, setIsLiked] = useState(false);

    // Draft.js :
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    useLayoutEffect(() => {
        Object.keys(subcomment).length > 0 && setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(subcomment?.content))));
    }, [subcomment]);

    // 🦸‍♀️ Fetch comment's author :
    useEffect ( () => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${subcomment.userId}`);
            setAuthor(res.data);
        }
        fetchUser();
    }, [subcomment])

    // ❤️ Set isLiked :
    useEffect ( () => {
        subcomment?.likes && setIsLiked(subcomment?.likes.some(like => like.userId === user?._id));
    }, [user?._id, subcomment.likes])

    // ❤️ Set like counter :
    useEffect ( () => {
        subcomment?.likes && setLikeCounter(subcomment?.likes.length);
    }, [subcomment.likes])

    // ❤️ Like handling :
    const likeHandler = async () => {
        try {
            await axios.put(`/comments/${subcomment._id}/like`, { userId: user._id } );
        } catch(err) {
            console.log(err)
        }
        setLikeCounter(isLiked ? likeCounter-1 : likeCounter+1);
        setIsLiked(!isLiked);
        // !isLiked && sendNotification('like');
    }

    return (
        <>
            <Single>
                <Author>
                    <Link to={`/profile/${author?.slug || author.username}`}>
                        <img src={`${MEDIA}/profile/${author.avatar || 'defaultAvatar.jpg'}`} className="avatar" />
                    </Link>
                    <h4>{author.username}</h4>
                </Author>

                <div className="body">
                    <div className="content">
                        <Editor 
                            editorState={editorState}
                            readOnly={true} 
                            toolbarStyle={{display: 'none'}}
                        />
                    </div>
                    <div className="flexbox">
                        <span className="date">{format(subcomment.createdAt)}</span>

                        <HeartContainer onClick={user ? likeHandler : openLogin} className={isLiked ? "liked" : ""}>
                            {likeCounter}
                            <HeartWrapper style={{width: '65px', height: '65px'}}>
                                <HeartAnimation ratio={65} liked={isLiked} />
                            </HeartWrapper>
                        </HeartContainer>
                    </div>
                </div>
            </Single>
        </>
        )
    }

export default Subcomment