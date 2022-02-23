// 🌌 React :
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';

// 🚧 React Component :
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Navbar from "../../components/navbar/Navbar.jsx";

// 🅰️ Axios :
import axios from "axios";

import "./profile.css"

export default function Profile({ socket }) {

    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    const [user, setUser] = useState({});
    const username = useParams().username;
    const slug = useParams().slug;
    const history = useHistory();

    useEffect ( () => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users?slug=${slug}`);
                setUser(res.data);
            } catch(err) {
                console.log(err);
                history.push('/home');
            }
        }
        fetchUser();
    }, [slug])


    return (
        <>
            <div className="profile">
                {/* <Sidebar/> */}
                <Navbar socket={socket} />
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
                        {/* <Feed username={user.username} /> */}
                        <div style={{flex: '50', height: '100vh'}}></div>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}
