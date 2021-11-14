import "./rightbar.css"
import { Users } from "../../dummyData"
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Online from "../online/Online"
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({user}) {

    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(user ? currentUser.following.includes(user._id) : false)

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

    const followHandler = async () => {
        try {
            if(followed) {
                await axios.put(`/users/${user._id}/unfollow`, {userId: currentUser._id})
                dispatch( {type: "UNFOLLOW", payload: user._id} )
            } else {
                await axios.put(`/users/${user._id}/follow`, {userId: currentUser._id});
                dispatch( {type: "FOLLOW", payload: user._id} )
            }
        } catch(err) {
            console.log(err)
        }
        setFollowed(!followed);
    }

    const HomeRightbar = () => {
        return(
            <>
            <div className="birthdayContainer">
                    <img className="birthdayImg" src={`${ASSETS}/gift.png`} alt="" />
                    <span className="birthdayText"><b>Giulio Favaro</b> and <b>2 other friends</b> celebrate their birthday today.</span>
                </div>
                <img src="/assets/ad.webp" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
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
                    <Link to={`/profile/${friend.username}`} style={{textDecoration: "none"}}>
                        <div className="rightbarFollowing">
                            <img src={friend.avatar ? `${MEDIA}/${friend.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`} alt="" className="rightbarFollowingImg" />
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
