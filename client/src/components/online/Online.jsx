import "./online.css"

export default function Online({user}) {

    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img src={user?.avatar ? `${MEDIA}/profile/${user.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
         </li>
    )
}
