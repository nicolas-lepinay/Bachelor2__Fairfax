import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Category from "./pages/category/Category";
import Detaile from "./components/post/Detaile";
import { AuthContext } from "./context/AuthContext";

import { useContext } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

function App() {

    const { user } = useContext(AuthContext);


    return (
    <Router>
        <Switch>
            {/*Toujours ajouter 'exact' pour la racine ! */}
            <Route exact path="/">
                {user ? <Home/> : <Register/>}
            </Route>

            <Route path="/login">
                {user ? <Redirect to="/"/> : <Login/>}
            </Route>

            <Route path="/register">
            {user ? <Redirect to="/"/> : <Register/>}
            </Route>

            <Route path="/profile/:username">
                <Profile/>
            </Route>

            <Route path="/category/:categoryName">
                <Category/>
            </Route>
            
            <Route path="/post/:id">
                <Detaile/>
            </Route>
        </Switch>
    </Router>

    )
}

export default App;