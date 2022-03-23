import React, { useState, useContext, useRef } from 'react';
// User :
import { UserContext } from '../../context/UserContext';
// Portal :
import ReactDom from 'react-dom';
// FontAwesome :
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faKey, faCheck } from "@fortawesome/free-solid-svg-icons";
import KeyIcon from "../../svg/KeyIcon";
// Axios :
import axios from "axios"
// Framer Motion :
import { motion } from 'framer-motion';
// Styled Components :
import { Backdrop, ModalWrapper, ModalContainer, FormWrapper, Form, Title, InputAndIcon, LinkAndIcon, Input, Info, Requirements, TextAndIcon, Button, OverlayContainer, Overlay, Panel, Description, SVG, InvalidEntry } from "./LoginModal.styled"
import { MATERIAL_STYLE, CHECK_STYLE, shake } from "./LoginModal.styled"

function LoginModal({ handleClose }) {

    // User :
    const { user: currentUser, setUser: setCurrentUser } = useContext(UserContext);

    // Active for panel slide :
    const [active, setActive] = useState("");

    // Passwords mismatch :
    const [mismatch, setMismatch] = useState(false);

    // Password has valid pattern :
    const [validPattern, setValidPattern] = useState(false);

    // Password has valid length :
    const [validLength, setValidLength] = useState(false);

    // Login data :
    const identifier = useRef();
    const password = useRef();

    // Register data :
    const username = useRef();
    const email = useRef();
    const password1 = useRef();
    const password2 = useRef();

    // Modal Wrapper :
    const modalWrapper = useRef();

    // Sliding panel animation :
    const slidePanel = () => {
        active === "" ? setActive("right__panel__active") : setActive("");
    }

    // Shaking modal animation (invalid submition) :
    const shakeModal = () => {
        modalWrapper.current.style.animation = `${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both`;
        modalWrapper.current.style.transform = `translate3d(0, 0, 0)`;
        modalWrapper.current.style.perspective = '1000px';
        setTimeout(function() {
            modalWrapper.current.style = null;
        }, 1500);
    }

    // Check if passwords match :
    const checkPasswordsMatch = () => {
        password1.current.value !== password2.current.value ? setMismatch(true) : setMismatch(false);
    }

    // Check if password is valid :
    const checkPasswordPattern = () => {
        const minLength = (str) => str.length >= 5
        const lowerCase = (str) => /[a-z]/g.test(str)
        const upperCase = (str) => /[A-Z]/g.test(str)
        const digit = (str) => /\d+/g.test(str)

        minLength(password1.current.value) ? setValidLength(true) : setValidLength(false)
        lowerCase(password1.current.value) && upperCase(password1.current.value) && digit(password1.current.value) ? setValidPattern(true) : setValidPattern(false)
    }

    // Check if password is valid overall :
    const checkPasswordValid = () => {
        checkPasswordsMatch();
        checkPasswordPattern();
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if(password2.current.value !== password1.current.value) {
            password2.current.setCustomValidity("Passwords do not match.");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password1.current.value
            }
            try {
                await axios.post("/auth/register", user);
                slidePanel(); // Le panneau coulisse pour inviter l'utilisateur à se connecter
            } catch(err) {
                console.log(err);
                alert("Oops, we encountered a problem registering your account.\n\nError: " + err)
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();        
        try {
            const res = await axios.post("/auth/login", { identifier: identifier.current.value, password: password.current.value })
            setCurrentUser(res.data);
            localStorage.setItem("fairfax_user", JSON.stringify(res.data))
            document.getElementById('root').style.filter = 'blur(0px)'; // J'enlève le fond flouté
        } catch (err) {
            shakeModal();
            console.log(err);
        }
    };

    const dropIn = {
        hidden: {
            y: "-20vh",
            opacity: 0
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 30,
                stiffness: 500,
                mass: 2
            }
        },
        exit: {
            y: "-30vh",
            opacity: 0,
            transition: {
                duration: 0.6,
                type: "tween"
            }
        }
    }

    return ReactDom.createPortal (
            <Backdrop onClick={handleClose}>
                <motion.div
                    onClick={ (e) => e.stopPropagation() }
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <ModalWrapper innerRef={modalWrapper}>
                        <ModalContainer className={active}>
                            <FormWrapper className="signup">
                                {/* <!-- | FORM SIGN-UP | --> */}
                                <Form onSubmit={handleRegister}>
                                    <Title className="golden">Register</Title>
                    
                                    {/* <!-- USERNAME INPUT --> */}
                                    <InputAndIcon>
                                        <FontAwesomeIcon icon={faUser} style={MATERIAL_STYLE} />
                                        <Input 
                                            type="text" 
                                            placeholder="Choose a username" 
                                            pattern="^[ a-zA-Z0-9._]{3,20}" title="Only letters, numbers, spaces, dots and underscores. Length required: 3 ~ 20" 
                                            required 
                                            innerRef={username} 
                                        />
                                    </InputAndIcon>
                    
                                    {/* <!-- EMAIL INPUT --> */}
                                    <InputAndIcon>
                                        <FontAwesomeIcon icon={faEnvelope} style={MATERIAL_STYLE} />
                                        <Input 
                                            type="email" 
                                            placeholder="Enter your email address" 
                                            maxlength="40" 
                                            required 
                                            innerRef={email}
                                        />
                                    </InputAndIcon>
                    
                                    {/* <!-- PASSWORD (1) INPUT --> */}
                                    <InputAndIcon>
                                        <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE} />
                                        <Input 
                                            type="password"
                                            placeholder="Choose a password" 
                                            required 
                                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}" 
                                            title="At least 6 characters, including a number, an uppercase letter and a lowercase letter." 
                                            innerRef={password1} 
                                            onChange={checkPasswordValid}
                                        />
                                    </InputAndIcon>
                    
                                    {/* <!-- PASSWORD (2) INPUT --> */}
                                    <InputAndIcon>
                                        <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE} />
                                        <Input 
                                            type="password" 
                                            placeholder="Confirm your password" 
                                            required 
                                            innerRef={password2} 
                                            onChange={checkPasswordValid}
                                        />
                                    </InputAndIcon>

                                    {mismatch && <InvalidEntry>Oops! Your passwords do not match.</InvalidEntry>}
                                        
                                    {/* <!-- INFOS SUR LES CARACTERES OBLIGATOIRES POUR LE MOT DE PASSE --> */}
                                    <Info>
                                        <div>Your password must contain:</div>
                                        <Requirements>
                                            <TextAndIcon style={!validLength ? {opacity: 0.3} : null}>
                                                <FontAwesomeIcon icon={faCheck} style={CHECK_STYLE} />
                                                <p>A minimum of 6 characters.</p>
                                            </TextAndIcon>
                    
                                            <TextAndIcon style={!validPattern ? {opacity: 0.3} : null}>
                                                <FontAwesomeIcon icon={faCheck} style={CHECK_STYLE} />
                                                <p>Uppercase, lowercase, and a number.</p>
                                            </TextAndIcon>
                                        </Requirements>
                                    </Info>
                    
                                    <Button
                                        type="submit"
                                        whileTap={{ scale: 0.92 }}
                                        disabled={mismatch || !validPattern || !validLength}
                                        style={mismatch || !validPattern || !validLength ? {opacity: 0.5, pointerEvents: 'none'} : null}
                                    >Continue
                                    </Button>
                                </Form>
                            </FormWrapper>

                            <FormWrapper className="signin">
                                {/* <!-- | FORM SIGN-IN | --> */}
                                <Form onSubmit={handleLogin}>
                                    <Title className="golden">Sign in</Title>
                    
                                    <InputAndIcon>
                                        <FontAwesomeIcon icon={faUser} style={MATERIAL_STYLE} />
                                        <Input type="text" placeholder="Username or email address" required innerRef={identifier}/>
                                    </InputAndIcon>
                    
                                    <InputAndIcon>
                                        <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE} />
                                        <Input type="password" placeholder="Enter your password" required innerRef={password}/>
                                    </InputAndIcon>
                    
                                    <LinkAndIcon>
                                        <SVG><KeyIcon/></SVG>
                                            <a href="/password-forgotten">Forgot your password?</a>
                                    </LinkAndIcon>
                    
                                    <Button type="submit" whileTap={{ scale: 0.92 }}>Continue</Button>
                                </Form>
                            </FormWrapper>

                            <OverlayContainer>
                                <Overlay>
                                    <Panel className="left">
                                        <Title>Already a member?</Title>
                                        <Description>If you already hold a Wizard Passport delivered by the European Covendom, please sign in with your personal information.</Description>
                                        <Button className="ghost" onClick={slidePanel}>Sign In</Button>
                                    </Panel>
                                    <Panel className="right">
                                        <Title>Not a member yet?</Title>
                                        <Description>Apply for a Wizard Passport and begin your journey in the city of Fairfax.</Description>
                                        <Button className="ghost" onClick={slidePanel}>Sign Up</Button>
                                    </Panel>
                                </Overlay>
                            </OverlayContainer>

                        </ModalContainer>
                    </ModalWrapper>
                </motion.div>
            </Backdrop>,
        document.getElementById('portal')
    )
}

export default LoginModal
