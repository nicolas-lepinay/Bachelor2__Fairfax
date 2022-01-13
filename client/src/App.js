import LandingPage from "./pages/landingPage/LandingPage"
import Home from "./pages/home/Home";
import Topbar from './components/topbar/Topbar.jsx'
import Profile from "./pages/profile/Profile";
import Category from "./pages/category/Category";
import PostDetails from "./pages/postDetails/PostDetails"
import Messenger from "./pages/messenger/Messenger.jsx"
import Account from "./pages/account/Account";
/* import LandingPage from "./pages/landingPage/LandingPage" */
/* import Account from "./pages/account/Account"
import LoginModal from "./modals/loginModal/LoginModal" */

import { UserContext } from "./context/UserContext"
import { useState, useMemo, useEffect } from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { io } from "socket.io-client";

function App() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const currentUser = useMemo( () => ({user, setUser}), [user, setUser] );

    const DefaultRoutes = () => {
        const [socket, setSocket] = useState(null);
    
        // 🔌 Socket.io :
        useEffect(() => {
            setSocket(io("ws://localhost:9000"));
        }, [])
    
        useEffect(() => {
            // Envoi de l'ID du user loggé au socket server :
            socket?.emit("NOTIFICATIONS_addUser", user._id);
            socket?.emit("MESSENGER_addUser", user._id); 
          }, [socket, user]);

        return (
          <>
            <Topbar socket={socket} />
            <Switch>
                <Route path="/home" >
                    {user ? <Home socket={socket}/> : <Redirect to="/"/>}
                </Route>

                <Route path="/profile/:username" >
                    <Profile/>
                </Route>

                <Route path="/category/:categoryName" component={Category} />
                {/* <Route path="/account/:username" component={Account}/> */}
                <Route path="/post" component={PostDetails} />

                <Route path="/messages">
                    {user ? <Messenger socket={socket}/> : <Redirect to="/"/>}
                </Route>

                <Route path="/account/:username" component={Account}/>

            </Switch>
          </>
        );
      };

    return (
        <Router>
            <Switch>
                <UserContext.Provider value={currentUser}>
                    {/*Toujours ajouter 'exact' pour la racine ! */}
                    <Route exact path="/">
                        {user ? <Redirect to="/home"/> : <LandingPage/>}
                    </Route>
        
                    <Route component={user ? DefaultRoutes : LandingPage} />
                </UserContext.Provider>
            </Switch>
        </Router>
      );
}

export default App;