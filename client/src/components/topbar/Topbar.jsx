import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { io } from "socket.io-client";

export default function Topbar({ socket }) {
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    const { user, setUser } = useContext(UserContext);
    // const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    // 🔌 Socket.io :
    // useEffect(() => {
    //     setSocket(io("ws://localhost:9000"));
    // }, [])

    useEffect(() => {
        socket?.on('getNotification', data => {
            setNotifications((prev) => [...prev, data])
        });
    }, [socket])

    console.log('Notifications :')
    console.log(notifications)

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

                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>
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
