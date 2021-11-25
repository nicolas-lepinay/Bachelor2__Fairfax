import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faKey, faCheck } from "@fortawesome/free-solid-svg-icons";
import KeyIcon from "../../svg/KeyIcon";

import { motion } from 'framer-motion';
import Backdrop from './Backdrop.jsx';
import { ModalWrapper, ModalContainer, FormWrapper, Form, Title, InputAndIcon, LinkAndIcon, Input, Info, Requirements, Text, Button, OverlayContainer, Overlay, Panel, Description, SVG } from "./LoginModal.styled"
import { MATERIAL_STYLE } from "./LoginModal.styled"

function LoginModal({ handleClose }) {

    const { user: currentUser, setUser: setCurrentUser } = useContext(UserContext)
    const [active, setActive] = useState("");
    const identifier = useRef();
    const password = useRef();

    const slidePanel = () => {
        active === "" ? setActive("right__panel__active") : setActive("");
    }

    const handleRegister = async (e) => {
        e.preventDefault();        
        try {
            
        } catch (err) {

        }
    };

    const handleLogin = async (e) => {
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
            y: "100vh",
            opacity: 0
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
                    <ModalWrapper>
                        <ModalContainer className={active}>
                            <FormWrapper className="signup">
                                {/* <!-- | FORM SIGN-UP | --> */}
                                <Form onSubmit={handleRegister}>
                                    <Title className="golden">Register</Title>
                    
                                    {/* <!-- USERNAME INPUT --> */}
                                    <InputAndIcon>
                                        <FontAwesomeIcon icon={faUser} style={MATERIAL_STYLE} />
                                        <Input type="text" placeholder="Choose a username" pattern="^[ a-zA-Z0-9._]{3,20}" title="Only letters, numbers, spaces, dots and underscores. Length required: 3 ~ 20" required />
                                    </InputAndIcon>
                    
                                    {/* <!-- EMAIL INPUT --> */}
                                    <InputAndIcon>
                                        <FontAwesomeIcon icon={faEnvelope} style={MATERIAL_STYLE} />
                                        <Input type="email" placeholder="Enter your email address" maxlength="40" required />
                                    </InputAndIcon>
                    
                                    {/* <!-- PASSWORD (1) INPUT --> */}
                                    <InputAndIcon>
                                        <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE} />
                                        <Input type="password" placeholder="Choose a password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}" title="At least 6 characters, including a number, an uppercase letter and a lowercase letter." />
                                    </InputAndIcon>
                    
                                    {/* <!-- PASSWORD (2) INPUT --> */}
                                    <InputAndIcon>
                                        <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE} />
                                        <Input type="password" placeholder="Confirm your password" required />
                                    </InputAndIcon>
                    
                                    {/* <!-- AVERTISSEMENT "YOUR PASSWORDS DO NOT MATCH" --> */}
                    
                                    {/* <!-- INFOS SUR LES CARACTERES OBLIGATOIRES POUR LE MOT DE PASSE --> */}
                                    <Info>
                                        <div>Your password must contain:</div>
                                        <Requirements>
                                            <Text>A minimum of 6 characters.</Text>
                                        </Requirements>
                    
                                        <Requirements>
                                            <Text>Uppercase, lowercase, and a number.</Text>
                                        </Requirements>
                                    </Info>
                    
                                    <Button class="button" type="submit">Continue</Button>
                                </Form>
                            </FormWrapper>

                            <FormWrapper className="signin">
                                {/* <!-- | FORM SIGN-IN | --> */}
                                <Form onSubmit={handleLogin}>
                                    <Title className="golden">Sign in</Title>
                    
                                    <InputAndIcon>
                                        <FontAwesomeIcon icon={faUser} style={MATERIAL_STYLE} />
                                        <Input type="text" placeholder="Username or email address" required ref={identifier}/>
                                    </InputAndIcon>
                    
                                    <InputAndIcon>
                                        <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE} />
                                        <Input type="password" placeholder="Enter your password" required ref={password}/>
                                    </InputAndIcon>
                    
                                    <LinkAndIcon>
                                        <SVG><KeyIcon/></SVG>
                                        <a href="/forgotten-password">Forgot your password?</a>
                                    </LinkAndIcon>
                    
                                    <Button class="button" type="submit">Continue</Button>
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
