import { useState, useEffect } from "react";
import { useParams } from "react-router";
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

    useEffect ( () => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    }, [username]);


    return (
        <>
				<Topbar/>
					<div className="profileRight container_profile">
						<img className="profileCoverImg cover_bg" src={`${MEDIA}/post/0.jpg`} alt="" />
						<div className="profileRightTop" id="fullpage">
							<div className="profileCover section">
									<img className="avatar_house" src={user.avatar ? `${MEDIA}/${user.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`} />
									<div className="avatar">
											{/* <img className="frame" src={`${ASSETS}/golden_frame.webp`} alt="" /> */}
											<img className="profileUserImg"src={user.avatar ? `${MEDIA}/${user.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`} alt="" />
											<h1 className="username">{user.username}</h1>
										</div>
									<span className="name_house">Nom de la maison</span>
							</div>
							<div className="profileInfo section">
								<h2 className="activity_title">Activity</h2>
								<div className="container_activs">
									<div className="activity_faxes">
										<div className="header"><span className="title">Your Faxes</span></div>
										<div className="content">
											<div className="item_content">
												<span className="title_item">Test titre item</span>
												<span className="date_item">October 2021, 12th</span>
											</div>
											<div className="item_content">
												<span className="title_item">Test titre item</span>
												<span className="date_item">October 2021, 12th</span>
											</div>
											<div className="item_content">
												<span className="title_item">Test titre item</span>
												<span className="date_item">October 2021, 12th</span>
											</div>
											<div className="item_content">
												<span className="title_item">Test titre item</span>
												<span className="date_item">October 2021, 12th</span>
											</div>
											<div className="item_content">
												<span className="title_item">Test titre item</span>
												<span className="date_item">October 2021, 12th</span>
											</div>
											<div className="item_content">
												<span className="title_item">Test titre item</span>
												<span className="date_item">October 2021, 12th</span>
											</div>
											<div className="item_content">
												<span className="title_item">Test titre item</span>
												<span className="date_item">October 2021, 12th</span>
											</div>
											<div className="item_content">
												<span className="title_item">Test titre item</span>
												<span className="date_item">October 2021, 12th</span>
											</div>
											<div className="item_content">
												<span className="title_item">Test titre item</span>
												<span className="date_item">October 2021, 12th</span>
											</div>
											<div className="item_content">
												<span className="title_item">Test titre item</span>
												<span className="date_item">October 2021, 12th</span>
											</div>
											<div className="item_content">
												<span className="title_item">Test titre item</span>
												<span className="date_item">October 2021, 12th</span>
											</div>
											<div className="item_content">
												<span className="title_item">Test titre item</span>
												<span className="date_item">October 2021, 12th</span>
											</div>
										</div>
									</div>
									<div className="activity_replies">
										<div className="header"><span className="title">Your Replies</span></div>
										<div className="content"></div>
									</div>
									<div className="activity_faxes_likes">
										<div className="header"><span className="title">Faxes you liked</span></div>
										<div className="content"></div>
									</div>
									<div className="activity_replies_liked">
										<div className="header"><span className="title">Replies you liked</span></div>
										<div className="content"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
        </>
    )
}
