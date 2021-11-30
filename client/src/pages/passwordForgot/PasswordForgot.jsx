import { useRef } from "react";
import axios from "axios"
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function PasswordForgot() {

    const email = useRef();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const emailRecup = {
                email: email.current.value
            }
            await axios.post("/auth/passwordForgot", emailRecup);
        } catch(err) {
            alert(err)
            console.log(err)
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
                        <input placeholder="Email" type="email" className="loginInput" required ref={email} />
                        <button className="loginButton" type="submit">Send</button>
                        <Link to="/login">
                            <button className="loginRegisterButton">Login</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}