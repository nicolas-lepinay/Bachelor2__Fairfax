import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

export default function Topbar() {

    const { user, setUser } = useContext(UserContext);
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

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
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="topbarLink">Home</span>
                </Link>                    
                {user && <span className="topbarLink" onClick={handleLogout}>Logout</span>}
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>

                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">2</span>
                    </div>

                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.avatar ? `${MEDIA}/${user.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`} alt="" className="topbarImg" />
                </Link>
            </div>

        </div>
    )
}
