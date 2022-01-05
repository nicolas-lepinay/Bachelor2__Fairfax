import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';
import axios from "axios";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

import "./profile.css"

export default function Profile() {

    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    const [user, setUser] = useState({});
    const username = useParams().username;
    const history = useHistory();

    useEffect ( () => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users?username=${username}`);
                setUser(res.data);

            } catch(err) {
                console.log(err);
                history.push('/home');
            }
        }
        fetchUser();
    }, [username])


    return (
        <>
            <Topbar/>
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg" src={`${MEDIA}/post/0.jpg`} alt="" />
                            <div className="avatar">
                                <img className="frame" src={`${ASSETS}/golden_frame.webp`} alt="" />
                                <img className="profileUserImg"src={user.avatar ? `${MEDIA}/profile/${user.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`} alt="" />
                            </div>
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">Description</span>

                        </div>
                       
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}
