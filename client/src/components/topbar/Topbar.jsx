import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { io } from "socket.io-client";
import axios from "axios";

export default function Topbar({ socket }) {
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    const { user, setUser } = useContext(UserContext);
    const [notifications, setNotifications] = useState([]);
    const [openNotifications, setOpenNotifications] = useState(false);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("fairfax_user");
    }

    useEffect(() => {
        socket?.on('getNotification', data => {
            setNotifications( (old) => [...old, data]);
        });
    }, [socket])

    const DisplayNotification = ({ notification }) => {

        const [action, setAction] = useState('');
        const [postTitle, setPostTitle] = useState('');
        const [username, setUsername] = useState('');
        
        useEffect(() => {
            const fetchPost = async () => {
                const res = await axios.get(`/posts/${notification.postId}`);
                setPostTitle(res.data?.title);
            }
            const fetchUser = async () => {
                const res = await axios.get(`/users?userId=${notification.senderId}`);
                setUsername(res.data.username);
            }

            fetchPost();
            fetchUser();
            notification.type === 'like' && (setAction('liked'));
            notification.type === 'comment' && (setAction('commented'));

        }, [notification]);


        return (
            <span className="notification">{`${username} ${action} your post "${postTitle}".`}</span>
        )
    };

    return (
        <div className="topbarContainer">

            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Home</span>
                </Link>
            </div>

            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search for friends or posts" className="searchInput" />
                </div>
            </div>

            <div className="topbarRight">
                <div className="topbarLinks">
                <Link to="/" style={{textDecoration:"none", color: "inherit"}}>
                    <span className="topbarLink">Home</span>
                </Link>                    
                {user && <span className="topbarLink" onClick={handleLogout}>Logout</span>}
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>

                    <Link to="/messages" style={{textDecoration:"none", color: "inherit"}}>
                        <div className="topbarIconItem">
                            <Chat/>
                            <span className="topbarIconBadge">2</span>
                        </div>
                    </Link>                    

                    <div className="topbarIconItem" onClick={ () => setOpenNotifications(!openNotifications) }>
                        <Notifications/>
                        {notifications.length > 0 && 
                        <span className="topbarIconBadge">{notifications.length}</span>
                        }
                    </div>

                    { openNotifications && notifications.length > 0 &&
                    <div className="notifications">
                        {notifications.map( (n, i) => <DisplayNotification notification={n} key={`dn-${i}`}/> ) }
                    </div>
                    }

                </div>
                { user &&          
                    <Link to={`/profile/${user.username}`}>
                        <img src={user.avatar ? `${MEDIA}/profile/${user.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`} alt={user.username} title={user.username} className="topbarImg" />
                    </Link>
                }
            </div>

        </div>
    )
}
