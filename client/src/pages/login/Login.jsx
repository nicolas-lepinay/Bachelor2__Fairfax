import { useRef, useContext } from "react";
import "./login.css" 
import axios from "axios"

import { UserContext } from "../../context/UserContext";

import { Link } from "react-router-dom";

export default function Login() {

    const identifier = useRef();
    const password = useRef();
    const { user: currentUser, setUser: setCurrentUser } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault();        
        try {
            const res = await axios.post("/auth/login", { identifier: identifier.current.value, password: password.current.value })
            setCurrentUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data))
        } catch (err) {
            console.log(err);
            alert("Login failed.\n\nError: " + err)
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Fairfax</h3>
                    <span className="loginDesc">Enter a whimsical world like you've never seen before.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input placeholder="Email or username" type="text" className="loginInput" required ref={identifier} />
                        <input placeholder="Password" type="password" className="loginInput" required minLength="6" ref={password} />
                        <button className="loginButton" type="submit">
                            {/* { isFetching ? <CircularProgress color="inherit" size="20px"/> : "Login"} */}
                            Login
                            </button>
                        <span className="loginForgot">I forgot my password</span>
                        <Link to="/register">
                            <button className="loginRegisterButton">Register</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
