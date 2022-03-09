// 🌌 React :
import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';

// 💅🏻 Styled Components :
import { Container, Header, FriendList, Wrapper, Friend, NoFriend } from './ProfileFollowing.styled';

// 🦸 UserContext :
import { UserContext } from "../../context/UserContext";

// 🅰️ Axios :
import axios from "axios";

function ProfileFollowing({ profileUser }) {
    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    // 🦸 User Context :
    const { user, setUser } = useContext(UserContext);

    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [section, setSection] = useState('following');

    useEffect( () => {
        const getFollowing = async () => {
            try {
                const followingList = await axios.get("/users/following/" + profileUser._id);
                setFollowing(followingList.data);
            } catch (err) {
                console.log(err)
            }
        }
        const getFollowers = async () => {
            try {
                const followersList = await axios.get("/users/followers/" + profileUser._id);
                setFollowers(followersList.data);
            } catch (err) {
                console.log(err)
            }
        }
        getFollowing();
        getFollowers();
    }, [profileUser]);

    return (
        <Container>
            <Header>
                <button 
                    onClick={() => setSection('following')}
                    className={section == 'following' ? 'active' : ''} >
                    Following
                </button>

                <button 
                    onClick={() => setSection('followers')}
                    className={section == 'followers' ? 'active' : ''} >
                    Followers
                </button>
            </Header>

            {section == 'following' && following.length === 0 && <NoFriend>{user?._id === profileUser ? `You are not following anyone.` : `${profileUser.username} is not following anyone.`}</NoFriend>}
            {section == 'followers' && followers.length === 0 && <NoFriend>{user?._id === profileUser ? `You are not followed by anyone.` : `${profileUser.username} is not followed by anyone.`}</NoFriend>}

            <Wrapper>
                <FriendList>
                    {section == 'following' && following.map( (friend) => (
                        <Link to={`/profile/${friend.slug}`} style={{textDecoration: "none"}}>
                            <Friend>
                                <img src={`${MEDIA}/profile/${friend?.avatar || 'defaultAvatar.jpg'}`} alt="" />
                                <h1 className="username">{friend.username}</h1>
                            </Friend>
                        </Link>
                    ))}

                    {section == 'followers' && followers.map( (friend) => (
                        <Link to={`/profile/${friend.slug}`}>
                            <Friend>
                                <img src={`${MEDIA}/profile/${friend?.avatar || 'defaultAvatar.jpg'}`} alt="" />
                                <h1 className="username">{friend.username}</h1>
                            </Friend>
                        </Link>
                    ))}
                </FriendList>
            </Wrapper>        
        </Container>
    )
}

export default ProfileFollowing