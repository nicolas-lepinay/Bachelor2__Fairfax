import LandingPage from "./pages/landingPage/LandingPage"
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Category from "./pages/category/Category";
import PostDetails from "./pages/postDetails/PostDetails"
import Messages from "./pages/messenger/Messenger.jsx"

import { UserContext } from "./context/UserContext"
import { useState, useMemo } from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

function App() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const currentUser = useMemo( () => ({user, setUser}), [user, setUser] );

    return (
    <Router>
        <Switch>

            <UserContext.Provider value={currentUser}>

                {/*Toujours ajouter 'exact' pour la racine ! */}
                <Route exact path="/" >
                    {user ? <Redirect to="/home"/> : <LandingPage/>}
                </Route>

                <Route path="/home" >
                    {user ? <Home/> : <Redirect to="/"/>}
                </Route>

                <Route path="/profile/:username" component={Profile} />
                <Route path="/category/:categoryName" component={Category} />
                <Route path="/post" component={PostDetails} />

                <Route path="/messages">
                    {user ? <Messages/> : <Redirect to="/"/>}
                </Route>

            </UserContext.Provider>

        </Switch>
    </Router>

    )
}

export default App;