import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faKey, faCheck } from "@fortawesome/free-solid-svg-icons";

import { ModalWrapper, ModalContainer, FormWrapper, Form, Title, InputAndIcon, Input, Info, Requirements, Text, Button, OverlayContainer, Overlay, Panel } from "./LoginModal.styled"
import { MATERIAL_STYLE } from "./LoginModal.styled"

function LoginModal() {
    return (
        <ModalWrapper>
            <ModalContainer>
                <FormWrapper className="signup">
                    {/* <!-- | FORM SIGN-UP | --> */}
                    <Form>
                        <Title>Register</Title>
            
                        {/* <!-- USERNAME INPUT --> */}
                        <InputAndIcon>
                            <FontAwesomeIcon icon={faUser} style={MATERIAL_STYLE} />
                            <Input id="signup-username" type="text" name="signup-username" placeholder="Choose a username" pattern="^[ a-zA-Z0-9._]{3,20}" title="Only letters, numbers, spaces, dots and underscores. Length required: 3 ~ 20" required />
                        </InputAndIcon>
            
                        {/* <!-- EMAIL INPUT --> */}
                        <InputAndIcon>
                            <FontAwesomeIcon icon={faEnvelope} style={MATERIAL_STYLE} />
                            <Input id="signup-email" type="email" name="signup-email" placeholder="Enter your email address" maxlength="40" required />
                        </InputAndIcon>
            
                        {/* <!-- PASSWORD (1) INPUT --> */}
                        <InputAndIcon>
                            <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE} />
                            <Input id="signup-password-1" name="signup-password" type="password" placeholder="Choose a password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}" title="At least 6 characters, including a number, an uppercase letter and a lowercase letter." />
                        </InputAndIcon>
            
                        {/* <!-- PASSWORD (2) INPUT --> */}
                        <InputAndIcon>
                            <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE} />
                            <Input id="signup-password-2" name="signup-password" type="password" placeholder="Confirm your password" required />
                        </InputAndIcon>
            
                        {/* <!-- AVERTISSEMENT "YOUR PASSWORDS DO NOT MATCH" --> */}
            
                        {/* <!-- INFOS SUR LES CARACTERES OBLIGATOIRES POUR LE MOT DE PASSE --> */}
                        <Info>
                            <div>Your password must contain the following :</div>
                            <Requirements>
                                <svg id="svg-1" height="13" viewBox="0 0 16 13" width="16">
                                    <path fill="#b19f6f" d="m5.6 8-3.2-3.2-2.4 2.4 5.6 5.6 10.4-10.4-2.4-2.4z"></path>
                                </svg>
                                <Text>A minimum of 6 characters.</Text>
                            </Requirements>
            
                            <Requirements>
                                <svg id="svg-2" height="13" viewBox="0 0 16 13" width="16">
                                    <path fill="#b19f6f" d="m5.6 8-3.2-3.2-2.4 2.4 5.6 5.6 10.4-10.4-2.4-2.4z"></path>
                                </svg>
                                <Text>Uppercase, lowercase, and a number.</Text>
                            </Requirements>
                        </Info>
            
                        <Button class="button flat" id="signup-button" type="submit">Continue</Button>
                    </Form>
                </FormWrapper>

                    <FormWrapper className="signin">
                    <Form>
                        <Title>Sign in</Title>
            
                        <InputAndIcon>
                            <FontAwesomeIcon icon={faUser} style={MATERIAL_STYLE} />
                            <Input id="login-identifier" name="login-identifier" type="text" placeholder="Username or email address" required />
                        </InputAndIcon>
            
                        <InputAndIcon>
                            <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE} />
                            <Input id="login-password" name="login-password" type="password" placeholder="Enter your password" required />
                        </InputAndIcon>
            
                        <InputAndIcon>
                            <a href="/forgotten-password">Forgot your password?</a>
                        </InputAndIcon>
            
                        <Button class="button flat" id="login-button">Continue</Button>
                    </Form>
                </FormWrapper>

                <OverlayContainer>
                    <Overlay>
                        <Panel className="left">
                            <Title>Already a member?</Title>
                            <p>If you already hold a Wizard Passport delivered by the European Covendom, please sign in with your personal information.</p>
                            <Button className="ghost" id="signIn">Sign In</Button>
                        </Panel>
                        <Panel className="right">
                            <Title>Not a member yet?</Title>
                            <p>Apply for a Wizard Passport and begin your journey in the city of Fairfax.</p>
                            <Button className="ghost" id="signUp">Sign Up</Button>
                        </Panel>
                    </Overlay>
                </OverlayContainer>
            </ModalContainer>
        </ModalWrapper>
    )
}

export default LoginModal
