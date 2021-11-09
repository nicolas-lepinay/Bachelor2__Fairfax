import "./closeFriend.css"

export default function CloseFriend({user}) {

    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    return (
        <div>
            <li className="sidebarFriend">
                <img className="sidebarFriendImg" src={`${MEDIA}/${user.avatar}`} alt="" />
                <span className="sidebarFriendName">{user.username}</span>
            </li>
        </div>
    )
}
