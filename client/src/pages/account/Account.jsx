import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { UserContext } from "../../context/UserContext";

import "./account.css";

export default function Account(){

    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    const MATERIAL_STYLE = {

        color: "white",
        left: "20px",
        top: "49%",
        opacity: "0.15",
        position: "absolute",
        transform: "translateY(-50%)"

    };

    const [image, setImage] = useState('');
    
    //On récupère une liste d'un utilisateur
    const { user } = useContext(UserContext);

    //Les références pour les ajouts dans la BDD
    const avatarRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const checkPasswordRef = useRef();

    //Pour le champs username et email on rentre les valeurs qui existe déjà
    useEffect(() => {

        usernameRef.current.value = user.username;
        emailRef.current.value = user.email;

    }, []);

    //Action qui permet d'envoyer les données au serveur
    const handleSubmit = (e) => {

        //On annule l'envoie direct
        e.preventDefault();

        const form = document.getElementById('form-validation');
        /* let formData = new FormData(form);
        console.log(formData); */
        let formData2 = new FormData();
        //formData.append('avatar', image.data);
        formData2.append('number', 15)

        //Les données qu'on envera au serveur
        /* let data = {

            userId: user._id,
            avatar: avatarRef.current.value,
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            checkPassword: checkPasswordRef.current.value

        }; */

        const config = {

            headers: {

                //token: user.accessToken,
                'content-type': 'multipart/formdata'

            }

        };

        //On fait un test pour vérifier si le serveur n'a pas eu de problème
        /* try {

           await axios.put(`/users/${user._id}`, formData2, config);

        } catch (err) {

            console.log(err);
            alert("Echec: " + err);

        } */

        axios.put(`/users/${user._id}`, formData2, config);

    };

    const handleImage = (e) => {

        /* const img = e.target.files[0];
        setImage(img); */

        const img = {

            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0]

        };
        setImage(img);

    }

    return (

        <div className="account_page">

            <div className="container">

                <div id="create-your-account">Account Settings</div>

                <div id="ornament">
                    <div id="fading-line-left"></div>
                    <div id="diamond-shape"></div>
                    <div id="fading-line-right"></div>
                </div>

                <form id="form-validation" onSubmit={handleSubmit}>

                    <input type="hidden" id="userId" value={user._id} />

                    {/* <div className="label">Profile picture</div>
                    <label className="custom-file-upload">
                        Nouvelle image:
                        <input type="file" name="image" accept="image/*" id="image_input"/>
                        <img className="avatar-img" src={user.avatar ? `${MEDIA}/${user.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`} alt="User Avatar" title="Change your profile picture" ref={avatarRef} onChange={handleImage}/>
                    </label> */}

                    <div className="label">Username</div>
                    <div className="inputWithIcon">
                        <input id="username" type="text" name="username" placeholder="Change your username" /* pattern="^[ a-zA-Z0-9._]{3,20}" */ title="Only letters, numbers, spaces, dots and underscores. Length required: 3 ~ 20" ref={usernameRef}/>
                        <FontAwesomeIcon icon={faUser} style={MATERIAL_STYLE}/>
                    </div>

                    <div className="label">Email address</div>
                    <div className="inputWithIcon">
                        <input type="email" id="email" name="email" placeholder="Change your email address" /* maxlength="40" */ ref={emailRef}/>
                        <FontAwesomeIcon icon={faEnvelope} style={MATERIAL_STYLE} />
                    </div>

                    <div className="label">Password</div>
                    <div className="inputWithIcon">
                        <input id="pwd-1" id="password" name="password" type="password" placeholder="Change your password" /* pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}" */ ref={passwordRef}/>
                        <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE} />
                    </div>

                    <div className="label">CheckPassword</div>
                    <div class="inputWithIcon">
                        <input id="pwd-2" id="checkPassword" name="checkPassword" type="password" placeholder="Confirm your new password" ref={checkPasswordRef}/>
                        <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE} />
                    </div>

                    {/* <div className="info">
                        <div>Your new password must contain the following :</div>
                        <br/>
                        <div>
                            <svg id="svg-1" height="13" viewBox="0 0 16 13" width="16">
                                <path d="m5.6 8-3.2-3.2-2.4 2.4 5.6 5.6 10.4-10.4-2.4-2.4z" fill="#fff"></path>
                            </svg>
                            <div>A minimum of 6 characters</div>
                        </div>

                        <div>
                            <svg id="svg-2" height="13" viewBox="0 0 16 13" width="16">
                                <path d="m5.6 8-3.2-3.2-2.4 2.4 5.6 5.6 10.4-10.4-2.4-2.4z" fill="#fff"></path>
                            </svg>
                            <div>A number and a combination of<br/>uppercase and lowercase letters.</div>
                        </div>
                    </div> */}

                    <button className="btn">Apply changes</button>

                </form>

            </div>

        </div>

    );

};