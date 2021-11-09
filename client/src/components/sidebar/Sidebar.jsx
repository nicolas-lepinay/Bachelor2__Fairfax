import "./sidebar.css"
import { RssFeed } from "@material-ui/icons"
import { HelpOutline } from "@material-ui/icons"
import { Event } from "@material-ui/icons"
import { Security } from "@material-ui/icons"
import { Map } from "@material-ui/icons"
import { LocalMall } from "@material-ui/icons"
import { Users } from "../../dummyData"
import CloseFriend from "../closeFriend/CloseFriend"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemText">News</span>
                    </li>

                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">Questions</span>
                    </li>

                    <li className="sidebarListItem">
                        <Event className="sidebarIcon"/>
                        <span className="sidebarListItemText">Events</span>
                    </li>

                    <li className="sidebarListItem">
                        <Security className="sidebarIcon"/>
                        <span className="sidebarListItemText">Quests</span>
                    </li>

                    <li className="sidebarListItem">
                        <Map className="sidebarIcon"/>
                        <span className="sidebarListItemText">Map</span>
                    </li>

                    <li className="sidebarListItem">
                        <LocalMall className="sidebarIcon"/>
                        <span className="sidebarListItemText">Inventory</span>
                    </li>
                </ul>

                <button className="sidebarButton">Show more</button>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                    {Users.map(u =>( 
                        <CloseFriend key={u.id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}
