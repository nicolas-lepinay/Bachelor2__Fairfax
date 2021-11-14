import "./closeFriend.css"
import { Link } from "react-router-dom";

export default function CloseFriend({user}) {

    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    return (
        <Link to={`/profile/${user.username}`} style={{textDecoration: "none"}}>
            <li className="sidebarFriend">
                <img className="sidebarFriendImg" src={`${MEDIA}/${user.avatar}`} alt="" />
                <span className="sidebarFriendName">{user.username}</span>
            </li>
        </Link>
    )
}
