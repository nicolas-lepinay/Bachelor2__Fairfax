// 🌌 React :
import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from 'react-router-dom';

// 💅🏻 Styled Components :
import { Container, Header, Logo, Settings, Main, Top, Avatar, House, Bottom } from './ProfileOverview.styled';

// 🦸 UserContext :
import { UserContext } from "../../context/UserContext";

// 🅰️ Axios :
import axios from "axios";

function ProfileOverview({ profileUser }) {
    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    // 🦸 User Context :
    const { user, setUser } = useContext(UserContext);

    const [followed, setFollowed] = useState(false);

    const followHandler = async () => {
        try {
            await axios.put(`/users/${profileUser._id}/follow`, {userId: user?._id});
            const updatedUser = await axios.get(`/users?userId=${user?._id}`);
            setUser(updatedUser.data);
            setFollowed(!followed);
        } catch(err) {
            console.log(err)
            alert("An error occured while trying to follow or unfollow the user.")
        }
    }

    useEffect ( () => {
        setFollowed(user?.following.includes(profileUser._id))
    }, [profileUser, user?.following])

    return (
        <Container>
            <Header>
                <Link to="/home">
                    <Logo>
                        <img src={`${ASSETS}/logos/logo-light-nude.png`} className="logo" title="Home" />
                    </Logo>
                </Link>

                <Link to="/settings" className="settings-link">
                    { profileUser._id === user?._id &&
                        <Settings>
                            <img src={`${ASSETS}/icons/icon-cog.svg`} className="settings-icon" />
                            <div className="tooltip">Settings</div>
                        </Settings>
                    }
                </Link>
            </Header>

            <Main>
                <Top>
                    <img src={`${ASSETS}/icons/shield-lock.png`} title="Coming soon..." />
                </Top>

                <Avatar>
                    { user && profileUser._id !== user?._id && (
                        <button onClick={followHandler}>
                            {followed ? "- Unfollow" : "+ Follow"} 
                        </button>
                    )}
                    <img src={`${MEDIA}/profile/${profileUser?.avatar || 'defaultAvatar.jpg'}`} />
                    <h1 className='username'>{profileUser.username}</h1>
                </Avatar>

                <House>
                    <p>Coming soon...</p>
                </House>

                <Bottom>
                    <img src={`${ASSETS}/icons/shield-potion.png`} title="Coming soon..." />
                    <img src={`${ASSETS}/icons/shield-trophy.png`} title="Coming soon..." />
                    <img src={`${ASSETS}/icons/shield-book.png`} title="Coming soon..." />
                    <img src={`${ASSETS}/icons/shield-card.png`} title="Coming soon..." />
                </Bottom>
            </Main>
        </Container>
    )
}

export default ProfileOverview