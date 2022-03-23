// 🌌 React :
import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';

// 💅🏻 Styled Components :
import { Container, HR, Single, Avatar, Columns, CommentContent, Row, Inline } from './CommentActivity.styled';

// 📝 Draft.js EditorState :
import { EditorState, convertFromRaw } from 'draft-js';

// 🅰️ Axios :
import axios from "axios";

function CommentActivity({ comments, profileUser }) {

    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    const SingleComment = ({ comment }) => {

        const [post, setPost] = useState({});
        const [author, setAuthor] = useState({});
        const [category, setCategory] = useState({});

        const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        useEffect ( () => {
            // Fetch comment's post :
            const fetchPost = async () => {
                const res = await axios.get(`/posts?id=${comment.postId}`);
                setPost(res.data);
            }
            // Send comment's content to EditorState :
            comment?.content && setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(comment?.content))));
            fetchPost();
        }, [comment])

        useEffect ( () => {
            // Fetch post's author :
            const fetchAuthor = async () => {
                const res = await axios.get(`/users?userId=${post?.userId}`);
                setAuthor(res.data);
            }
            // Fetch post's category :
            const fetchCategory = async () => {
                const res = await axios.get(`/categories?categoryId=${post?.categoryId}`);
                setCategory(res.data);
            }
            post?._id && fetchAuthor();
            post?._id && fetchCategory();
        }, [post])

        return (
            <Single>
                <Row>
                    <Avatar src={`${MEDIA}/profile/${profileUser?.avatar || 'defaultAvatar.jpg'}`} />
                    <Columns>
                        
                        {/* <Link to={`/category/${category.slug}/${post.slug}`}>
                            <PostTitle>{post.title}</PostTitle>
                        </Link> */}

                        <CommentContent>{editorState.getCurrentContent().getPlainText('\u0001')}</CommentContent>

                        <Inline>
                            <p>{comment.likes.length} 🤍</p>
                            <p className="separator">♦</p>
                            <p>{new Date(comment.createdAt).toLocaleDateString('en-US', dateOptions)}</p>
                            <p className="separator">♦</p>
                            <Link to={`/category/${category?.slug}/${post?.slug}`}>
                                <p className="link">{post?.title || 'Loading...'}</p>
                            </Link>
                            <p className="separator">♦</p>
                            <Link to={`/profile/${author?.slug}`}>
                                <p className="link">{author?.username || 'Loading...'}</p>
                            </Link>
                            <p className="separator">♦</p>
                            <Link to={`/category/${category.slug}`}>
                                <p className="link">{category?.name || 'Loading...'}</p>
                            </Link>
                        </Inline>
                    </Columns>
                </Row>
            </Single>
        )
    }

    return (
        <Container>
            {comments.map( (comment, i) => (
                <>
                    <SingleComment comment={comment} key={`comment-activity-${comment._id}`} />
                    { i != comments.length - 1 &&
                        <HR/>
                    }
                </>    
            ))}
        </Container>
    )
}

export default CommentActivity