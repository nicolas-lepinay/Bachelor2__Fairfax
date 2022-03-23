// React :
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// Styled components :
import { MATERIAL_STYLE, Nav, List, Item, Avatar, SVG, Alert } from './NavbarNude.styled';

// UserContext :
import { UserContext } from "../../context/UserContext";

// Login Modal :
import LoginModal from "../../modals/loginModal/LoginModal.jsx";

// World Map Modal :
import WorldMap from "../../modals/worldMap/WorldMap.jsx";

// Framer Motion :
import { AnimatePresence } from 'framer-motion';

// MaterialUI Icons :
import { Lock, AccessTime } from '@material-ui/icons';

function NavbarNude({ socket, visible=true }) {

    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;
    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;

    // 🦸 UserContext :
    const { user, setUser } = useContext(UserContext);

    // 🗝️ Is 'LOGIN MODAL' open ? :
    const [loginOpen, setLoginOpen] = useState(false);

    // 🗺️ Is 'WORLD MAP' open ? :
    const [worldMapOpen, setWorldMapOpen] = useState(false);

    const [notifications, setNotifications] = useState([]);
    const [openNotifications, setOpenNotifications] = useState(false);

    useEffect(() => {
        socket?.on('getNotification', data => {
            setNotifications( (old) => [...old, data]);
        });
    }, [socket]);

    // Open Login modal :
    const openModal = (target) => {
        target == 'login' && setLoginOpen(true);
        target == 'world-map' && setWorldMapOpen(true);
        // setLoginOpen(true);
        document.getElementById('root').style.transition = '0.8s filter ease-in-out';
        document.getElementById('root').style.filter = 'blur(5px) brightness(30%)';
    }

    // Close Login modal :
    const closeModal = () => {
        setLoginOpen(false);
        setWorldMapOpen(false);
        document.getElementById('root').style.filter = 'blur(0px) brightness(1)';
    }

    // Log out user :
    const logout = () => {
        setUser(null);
        localStorage.removeItem("fairfax_user");
    }

    // Display notification widget :
    const DisplayNotification = ({ notification }) => {

        const [action, setAction] = useState('');

        useEffect(() => {
            notification.type === 'like' && (setAction('liked'));
            notification.type === 'comment' && (setAction('commented'));
        }, [notification]);

        return (
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <Link to={`/profile/${notification.sender?.slug || notification.sender.username}`} style={{textDecoration: 'none'}}>
                    <img 
                        src={`${MEDIA}/profile/${notification.sender.avatar || 'defaultAvatar.jpg'}`}
                        style={{width: '30px', height: '30px', borderRadius: '50%'}}
                        title={`${notification.sender.username}'s Profile`}
                        />
                </Link>
                <span className="single-notification">{`${notification.sender.username} ${action} your post "${notification.post.title}".`}</span>
            </div>
        )
    };

  return (
    <>
        <Nav className={visible ? "" : "hidden"}>
            <List>
                {/* 🏰 LOGO */}
                <Link to="/home" className="link">
                    <Item className="home">
                        <SVG
                            src={`${ASSETS}/icons/icon-castle-outline-2.png`}
                            className="castle"
                            alt="Home"
                            title="Home"
                        />
                        <div className="tooltip">Home</div>
                    </Item>
                </Link>

                {/* 🦸 PROFILE */}
                { user ?
                <Link to={`/profile/${user.slug || user.username}`} className="link">
                    <Item>
                        <Avatar
                            src={`${MEDIA}/profile/${user.avatar || 'defaultAvatar.jpg'}`}
                            alt={user.username}
                            title="My account"
                        />
                        <div className="tooltip">My account</div>
                    </Item>
                </Link>
                :
                <Item onClick={() => openModal('login')}>
                    <SVG src={`${ASSETS}/icons/navbar-person.svg`} />
                    <div className="tooltip">Login</div>
                </Item>
                }

                {/* 💬 NOTIFICATIONS */}
                { user ?
                    <Item onClick={ () => setOpenNotifications(!openNotifications) }>
                        <SVG src={`${ASSETS}/icons/navbar-notifications.svg`} />
                        {!openNotifications && <div className="tooltip">{notifications.length > 0 && `${notifications.length}`} Notifications</div>}
                        {notifications.length > 0 && <Alert/>}

                        { openNotifications && notifications.length > 0 &&
                            <div className="notifications">
                                {notifications.map( (n, i) => <DisplayNotification notification={n} key={`display-notification-${i}`}/> ) }
                                <button onClick={() => setNotifications([])}>Clear</button>
                            </div>
                        }
                    </Item>
                :
                <Item>
                    <SVG src={`${ASSETS}/icons/navbar-notifications.svg`} />
                        <div className="tooltip">
                            <Lock style={MATERIAL_STYLE}/>
                            <span className="ml-25">Members only</span>
                        </div>
                 </Item>
                }

                {/* 💬 MESSAGES */}
                { user ?
                <Link to="/messages">
                    <Item>
                        <SVG src={`${ASSETS}/icons/navbar-envelope.svg`} />
                        <div className="tooltip">Messages</div>
                    </Item>
                </Link>
                :
                <Item>
                    <SVG src={`${ASSETS}/icons/navbar-envelope.svg`} />
                        <div className="tooltip">
                            <Lock style={MATERIAL_STYLE}/>
                            <span className="ml-25">Members only</span>
                        </div>
                 </Item>
                }

                {/* 🐱 FRIENDS REQUESTS */}
                { user ?
                <Item>
                    <SVG src={`${ASSETS}/icons/navbar-friend.svg`} />
                    <div className="tooltip">Friend requests</div>
                </Item>
                :
                <Item>
                    <SVG src={`${ASSETS}/icons/navbar-friend.svg`} />
                        <div className="tooltip">
                            <Lock style={MATERIAL_STYLE}/>
                            <span className="ml-25">Members only</span>
                        </div>
                 </Item>
                }

                {/* 📜 QUESTS */}
                { user ?
                <Item>
                <SVG src={`${ASSETS}/icons/navbar-scroll.svg`} />
                    <div className="tooltip">
                        <AccessTime style={MATERIAL_STYLE}/>
                        <span className="ml-25">Quests (coming soon)</span>
                    </div>
                </Item>
                :
                <Item>
                    <SVG src={`${ASSETS}/icons/navbar-scroll.svg`} />
                        <div className="tooltip">
                            <Lock style={MATERIAL_STYLE}/>
                            <span className="ml-25">Members only</span>
                        </div>
                 </Item>
                }

                {/* 💰 REWARDS */}
                { user ?
                <Item>
                <SVG src={`${ASSETS}/icons/navbar-bag.svg`} />
                    <div className="tooltip">
                        <AccessTime style={MATERIAL_STYLE}/>
                        <span className="ml-25">Rewards (coming soon)</span>
                    </div>
                </Item>
                :
                <Item>
                    <SVG src={`${ASSETS}/icons/navbar-bag.svg`} />
                        <div className="tooltip">
                            <Lock style={MATERIAL_STYLE}/>
                            <span className="ml-25">Members only</span>
                        </div>
                 </Item>
                }

                {/* 💰 INVENTORY */}
                { user ?
                <Item>
                <SVG src={`${ASSETS}/icons/navbar-suitcase.svg`} />
                    <div className="tooltip">
                        <AccessTime style={MATERIAL_STYLE}/>
                        <span className="ml-25">Inventory (coming soon)</span>
                    </div>
                </Item>
                :
                <Item>
                    <SVG src={`${ASSETS}/icons/navbar-suitcase.svg`} />
                        <div className="tooltip">
                            <Lock style={MATERIAL_STYLE}/>
                            <span className="ml-25">Members only</span>
                        </div>
                 </Item>
                }

                {/* 🗺️ CARTE DU MONDE */}
                <Item onClick={() => openModal('world-map')} >
                    <SVG src={`${ASSETS}/icons/navbar-map.svg`} />
                    <div className="tooltip">City Map</div>
                </Item>

                {/* 🛑 LOGOUT */}
                { user &&
                <Item onClick={logout}>
                    <SVG src={`${ASSETS}/icons/navbar-bird.svg`} />
                    <div className="tooltip">Leave</div>
                </Item>
                }

            </List>
        </Nav>

        {/* LOGIN / SIGNUP MODAL */}
        <AnimatePresence 
            initial={false} 
            exitBeforeEnter={true} 
            onExitComplete={() => null}
        >
            {loginOpen && <LoginModal isOpen={loginOpen} handleClose={closeModal} />}
        </AnimatePresence>

        {/* WORLD MAP */}
        <AnimatePresence 
            initial={false} 
            exitBeforeEnter={true} 
            onExitComplete={() => null}
        >
            {/* {worldMapOpen && <WorldMap isOpen={worldMapOpen} handleClose={closeModal} />} */}
            {worldMapOpen && <WorldMap isOpen={worldMapOpen} handleClose={closeModal} />}
        </AnimatePresence>
    </>

  );
}

export default NavbarNude;
