import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"

export default function Rightbar({user}) {

    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

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
            <h4 className="rightbarTitle">Information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Club:</span>
                    <span className="rightbarInfoValue">Columbus Krakens (user.house)</span>
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
                    <div className="rightbarFollowing">
                        <img src={`${MEDIA}/profile/005.jpg`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Alin Mela</span>
                    </div>

                    <div className="rightbarFollowing">
                        <img src={`${MEDIA}/profile/004.jpg`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Jane Doe</span>
                    </div>

                    <div className="rightbarFollowing">
                        <img src={`${MEDIA}/profile/003.jpg`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">John Doe</span>
                    </div>

                    <div className="rightbarFollowing">
                        <img src={`${MEDIA}/profile/002.jpg`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Millie Brown</span>
                    </div>
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
