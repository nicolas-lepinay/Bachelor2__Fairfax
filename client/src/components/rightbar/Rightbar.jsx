import "./rightbar.css"
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Online from "../online/Online"
import axios from "axios";
import { UserContext } from "../../context/UserContext";

import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({user}) {

    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    const [friends, setFriends] = useState([]);
    const { user: currentUser, setUser: setCurrentUser } = useContext(UserContext);

    useEffect( () => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err)
            }
        }
        user && getFriends();
    }, [user, currentUser.following]);

    const HomeRightbar = () => {
        return(
            <>
            <div className="birthdayContainer">
                    <img className="birthdayImg" src={`${ASSETS}/gift.png`} alt="" />
                    <span className="birthdayText"><b>Giulio Favaro</b> and <b>2 other friends</b> celebrate their birthday today.</span>
                </div>
                <img src={`${ASSETS}/ad.webp`} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                {/* <ul className="rightbarFriendList">
                    {Users.map(u => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul> */}
            </>
        )
    }

    const ProfileRightbar = () => {

        const [followed, setFollowed] = useState(false);

        const followHandler = async () => {
            try {
                await axios.put(`/users/${user._id}/follow`, {userId: currentUser._id});
                const updatedUser = await axios.get(`/users?userId=${currentUser._id}`);
                setCurrentUser(updatedUser.data);
                setFollowed(!followed);
            } catch(err) {
                console.log(err)
                alert("Follow/Unfollow failed.")
            }
        }

        useEffect ( () => {
            setFollowed(currentUser.following.includes(user._id))
        }, [user.username, currentUser.following])

        return(
        <>
            { user.username !== currentUser.username && (
                <button className="followButton" onClick={followHandler}>
                    {followed ? "Unfollow" : "Follow"} 
                    {followed ? <Remove/> : <Add/>} 
                </button>
            )}

            <h4 className="rightbarTitle">Information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Club:</span>
                    {/* user.house : */}
                    <span className="rightbarInfoValue">Columbus Krakens</span>
                </div>

                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Familiar:</span>
                    <span className="rightbarInfoValue">Black Cat</span>
                </div>

                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Wand:</span>
                    <span className="rightbarInfoValue">...</span>
                </div>
            </div>
            <h4 className="rightbarTitle">{user.username}'s Friends</h4>
            <div className="rightbarFollowings">

                    {friends.map( (friend) => (
                    <Link to={`/profile/${friend.slug}`} style={{textDecoration: "none"}}>
                        <div className="rightbarFollowing">
                            <img src={friend.avatar ? `${MEDIA}/profile/${friend.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`} alt="" className="rightbarFollowingImg" />
                            <span className="rightbarFollowingName">{friend.username}</span>
                        </div>
                    </Link>
                    ))}
            </div>
        </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar/> : <HomeRightbar/>}
            </div>
        </div>
    )
}
