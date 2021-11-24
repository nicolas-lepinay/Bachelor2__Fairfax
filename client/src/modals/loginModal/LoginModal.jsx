import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faKey, faCheck } from "@fortawesome/free-solid-svg-icons";
import KeyIcon from "../../svg/KeyIcon";

import { ModalWrapper, ModalContainer, FormWrapper, Form, Title, InputAndIcon, LinkAndIcon, Input, Info, Requirements, Text, Button, OverlayContainer, Overlay, Panel, Description, SVG } from "./LoginModal.styled"
import { MATERIAL_STYLE } from "./LoginModal.styled"

function LoginModal() {

    const [ active, setActive] = useState("");

    const slidePanel = () => {
        active === "" ? setActive("right__panel__active") : setActive("");
    }

    return (
        <ModalWrapper>
            <ModalContainer className={active}>
                <FormWrapper className="signup">
                    {/* <!-- | FORM SIGN-UP | --> */}
                    <Form>
                        <Title className="golden">Register</Title>
            
                        {/* <!-- USERNAME INPUT --> */}
                        <InputAndIcon>
                            <FontAwesomeIcon icon={faUser} style={MATERIAL_STYLE} />
                            <Input type="text" name="signup-username" placeholder="Choose a username" pattern="^[ a-zA-Z0-9._]{3,20}" title="Only letters, numbers, spaces, dots and underscores. Length required: 3 ~ 20" required />
                        </InputAndIcon>
            
                        {/* <!-- EMAIL INPUT --> */}
                        <InputAndIcon>
                            <FontAwesomeIcon icon={faEnvelope} style={MATERIAL_STYLE} />
                            <Input type="email" name="signup-email" placeholder="Enter your email address" maxlength="40" required />
                        </InputAndIcon>
            
                        {/* <!-- PASSWORD (1) INPUT --> */}
                        <InputAndIcon>
                            <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE} />
                            <Input name="signup-password" type="password" placeholder="Choose a password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}" title="At least 6 characters, including a number, an uppercase letter and a lowercase letter." />
                        </InputAndIcon>
            
                        {/* <!-- PASSWORD (2) INPUT --> */}
                        <InputAndIcon>
                            <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE} />
                            <Input name="signup-password" type="password" placeholder="Confirm your password" required />
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
                    <Form>
                        <Title className="golden">Sign in</Title>
            
                        <InputAndIcon>
                            <FontAwesomeIcon icon={faUser} style={MATERIAL_STYLE} />
                            <Input name="login-identifier" type="text" placeholder="Username or email address" required />
                        </InputAndIcon>
            
                        <InputAndIcon>
                            <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE} />
                            <Input name="login-password" type="password" placeholder="Enter your password" required />
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
    )
}

export default LoginModal
