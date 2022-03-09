// 🌌 React :
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// 💅🏻 Styled Components :
import { Container, HR, Single, Avatar, Columns, PostTitle, PostContent, Row, Inline } from './PostActivity.styled';

// 📝 Draft.js EditorState :
import { EditorState, convertFromRaw } from 'draft-js';

// 🅰️ Axios :
import axios from "axios";

function PostActivity({ posts, profileUser }) {

    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    const SinglePost = ({ post }) => {

        const [category, setCategory] = useState({});
        const [author, setAuthor] = useState(profileUser ? profileUser : {} );

        const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        useEffect ( () => {
            const fetchCategory = async () => {
                const res = await axios.get(`/categories?categoryId=${post.categoryId}`);
                setCategory(res.data);
            }
            const fetchUser = async () => {
                const res = await axios.get(`/users?userId=${post.userId}`);
                setAuthor(res.data);
            }

            // Send post's content to EditorState :
            post?.content && setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(post?.content))));
            // Fetch post's author (if profileUser doesn't exist) :
            !profileUser && fetchUser();
            // Fetch post's category :
            fetchCategory();
        }, [post])

        return (
            <Single>
                <Row>
                    <Avatar src={`${MEDIA}/profile/${author?.avatar || 'defaultAvatar.jpg'}`} />
                    <Columns>
                        
                        <Link to={`/category/${category.slug}/${post.slug}`}>
                            <PostTitle>{post.title}</PostTitle>
                        </Link>

                        <PostContent>{editorState.getCurrentContent().getPlainText('\u0001')}</PostContent>

                        <Inline>
                            <p>{post.likes.length} 🤍</p>
                            <p className="separator">♦</p>
                            <Link to={`/profile/${author?.slug}`}>
                                <p className="link">{author?.username || 'Loading...'}</p>
                            </Link>
                            <p className="separator">♦</p>
                            <p>{new Date(post.createdAt).toLocaleDateString('en-US', dateOptions)}</p>
                            <p className="separator">♦</p>
                            <Link to={`/category/${category.slug}`}>
                                <p className="link"> {category.name}</p>
                            </Link>
                        </Inline>
                    </Columns>
                </Row>
            </Single>
        )
    }

    return (
        <Container>
            {posts.map( (post, i) => (
                <>
                    <SinglePost post={post} key={`post-activity-${post._id}`} />
                    { i != posts.length - 1 &&
                        <HR/>
                    }
                </> 
            ))}
        </Container>
    )
}

export default PostActivity