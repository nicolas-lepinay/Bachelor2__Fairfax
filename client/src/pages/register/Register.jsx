import "./register.css"
import { useRef } from "react";
import axios from "axios"
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const password2 = useRef();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password2.current.value !== password.current.value) {
            password2.current.setCustomValidity("Passwords do not match.")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post("/auth/register", user);
                history.push("/login");
            } catch(err) {
                console.log(err)
            }
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
                        <input placeholder="Username" className="loginInput" required ref={username} />
                        <input placeholder="Email" type="email" className="loginInput" required ref={email} />
                        <input placeholder="Password" type="password" className="loginInput" required minLength="6" ref={password} />
                        <input placeholder="Confirm your password" type="password" className="loginInput" required ref={password2} />
                        <button className="loginButton" type="submit">Register</button>
                        <Link to="/login">
                            <button className="loginRegisterButton">Login</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
