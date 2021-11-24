import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Category from "./pages/category/Category";
import PostDetails from "./pages/postDetails/PostDetails"
import LandingPage from "./pages/landingPage/LandingPage"
import LoginModal from "./modals/loginModal/LoginModal"

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
                <Route exact path="/" component={user ? Home : Register} />

                <Route path="/login" >
                    {user ? <Redirect to="/"/> : <Login/>}
                </Route>

                <Route path="/signin" >
                    <LandingPage/>
                </Route>

                <Route path="/login-modal" >
                    <LoginModal/>
                </Route>

                <Route path="/register">
                {user ? <Redirect to="/"/> : <Register/>}
                </Route>

                <Route path="/profile/:username" component={Profile} />
                <Route path="/category/:categoryName" component={Category} />
                <Route path="/post" component={PostDetails} />
            </UserContext.Provider>

        </Switch>
    </Router>

    )
}

export default App;