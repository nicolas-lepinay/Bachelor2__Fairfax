import { useRef, useContext } from "react";
import "./login.css" 
import { loginCall } from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core"
import { Link } from "react-router-dom";

export default function Login() {

    const identifier = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);


    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall( { identifier: identifier.current.value, password: password.current.value }, dispatch) // userCredentials, dispatch
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
                        <button className="loginButton" type="submit" disabled={isFetching}>
                            { isFetching ? <CircularProgress color="inherit" size="20px"/> : "Login"}
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
