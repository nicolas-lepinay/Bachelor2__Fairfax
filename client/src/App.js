import LandingPage from "./pages/landingPage/LandingPage"
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

import Settings from "./pages/settings/Settings.jsx";
import Category from "./pages/category/Category";
import PostPage from "./pages/postPage/PostPage"
import Messenger from "./pages/messenger/Messenger.jsx"
import PasswordForgot from "./pages/passwordForgot/PasswordForgot";
import ResetPassword from "./pages/resetPassword/ResetPassword";

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

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("fairfax_user")) || null);
    const currentUser = useMemo( () => ({user, setUser}), [user, setUser] );

    const DefaultRoutes = () => {
        const [socket, setSocket] = useState(null);
    
        // 🔌 Socket.io :
        useEffect(() => {
            setSocket(io("ws://localhost:9000"));
        }, [])
    
        useEffect(() => {
            // Envoi de l'ID du user loggé au socket server :
            user && socket?.emit("NOTIFICATIONS_addUser", user?._id);
            user && socket?.emit("MESSENGER_addUser", user?._id); 
          }, [socket, user]);

        return (
          <>
            <Switch>
                <Route path="/home" >
                    <Home socket={socket}/>
                </Route>

                <Route path="/profile/:slug" >
                    <Profile socket={socket}/>
                </Route>

                <Route path="/settings">
                    {user ? <Settings socket={socket}/> : <Redirect to="/"/>}
                </Route>

                {/* RESPECTER L'ORDRE DE CES 2 ROUTES */}
                <Route path="/category/:categorySlug/:postSlug">
                    <PostPage socket={socket}/>
                </Route>

                <Route path="/category/:slug">
                    <Category socket={socket}/>
                </Route>
                {/* ~ FIN ~ */}

                <Route path="/post" component={PostPage} />

                <Route path="/messages">
                    {user ? <Messenger socket={socket}/> : <Redirect to="/"/>}
                </Route>

                <Route path="/password-forgotten">
                    {user ? <Redirect to="/home"/> : <PasswordForgot/>}
                </Route>

                <Route path="/resetPassword/:id">
                    {user ? <Redirect to="/home"/> : <ResetPassword/>}
                </Route>

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
        
                    <Route>
                       <DefaultRoutes/>
                    </Route>                    
                </UserContext.Provider>
            </Switch>
        </Router>
      );
}

export default App;