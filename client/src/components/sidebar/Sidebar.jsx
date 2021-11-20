import "./sidebar.css"

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { RssFeed } from "@material-ui/icons"
import { HelpOutline } from "@material-ui/icons"
import { Event } from "@material-ui/icons"
import { Security } from "@material-ui/icons"
import { Map } from "@material-ui/icons"
import { LocalMall } from "@material-ui/icons"
import CloseFriend from "../closeFriend/CloseFriend"

import { UserContext } from "../../context/UserContext";

export default function Sidebar() {

    const { user } = useContext(UserContext);
    const [friends, setFriends] = useState([]);

    useEffect( () => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err)
            }
        }
        getFriends();
    }, [user]);

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemText">News</span>
                    </li>

                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">Questions</span>
                    </li>

                    <li className="sidebarListItem">
                        <Event className="sidebarIcon"/>
                        <span className="sidebarListItemText">Events</span>
                    </li>

                    <li className="sidebarListItem">
                        <Security className="sidebarIcon"/>
                        <span className="sidebarListItemText">Quests</span>
                    </li>

                    <li className="sidebarListItem">
                        <Map className="sidebarIcon"/>
                        <span className="sidebarListItemText">Map</span>
                    </li>

                    <li className="sidebarListItem">
                        <LocalMall className="sidebarIcon"/>
                        <span className="sidebarListItemText">Inventory</span>
                    </li>

                    <li className="sidebarListItem">
                        <Link to="/category/Café" style={{textDecoration: "none"}}>
                            <span className="sidebarListItemText">Café</span>
                        </Link>
                    </li>

                    <li className="sidebarListItem">
                        <Link to="/category/Theater" style={{textDecoration: "none"}}>
                            <span className="sidebarListItemText">Theater</span>
                        </Link>
                    </li>

                    <li className="sidebarListItem">
                        <Link to="/category/Library" style={{textDecoration: "none"}}>
                            <span className="sidebarListItemText">Library</span>
                        </Link>
                    </li>

                    <li className="sidebarListItem">
                        <Link to="/category/Arcade" style={{textDecoration: "none"}}>
                            <span className="sidebarListItemText">Arcade</span>
                        </Link>
                    </li>

                </ul>

                <button className="sidebarButton">Show more</button>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                    {friends.map(friend =>( 
                        <CloseFriend key={friend.id} user={friend}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}
