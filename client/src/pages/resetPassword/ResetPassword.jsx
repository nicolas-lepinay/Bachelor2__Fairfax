import { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

// 💅🏻 Styled Components :
import { MATERIAL_STYLE, Container, Wrapper, Heading, Ornament, Form, Subheading, InputWrapper, Input, Button } from './ResetPassword.styled';

// 🤍 FontAwesome :
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Axios :
import axios from "axios"

export default function ResetPassword() {

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const id = useParams().id;
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password2 !== password) {
            alert("Your passwords do not match.")
        } else {
            try {
                const passwordChange = {
                    password: password
                }
                await axios.post(`/auth/resetPassword/${id}`, passwordChange);
                history.push("/");
            } catch(err) {
                alert("An error occured while attempting to reset your password.")
                console.log(err)
            }
        }
    };

    return (
        <Container>
        <Link to='/'>
            <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="#ffffff" strokeWidth={2} d="M3,3 L21,21 M3,21 L21,3"/>
            </svg>
        </Link>
        <Wrapper>
            <Heading>Password Reset</Heading>
            <Ornament>
                <span className="line left"></span>
                <span className="diamond"></span>
                <span className="line right"></span>
            </Ornament>
            <Form onSubmit={handleSubmit}>
                <Subheading>New password</Subheading>
                <InputWrapper>
                    <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE}/>
                    <Input
                        placeholder="Choose a new password..."
                        type="password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}" 
                        title="At least 6 characters, including a number, an uppercase letter and a lowercase letter." 
                        onChange={ (e) => setPassword(e.target.value) }
                    />
                </InputWrapper>

                <Subheading>Confirm password</Subheading>
                <InputWrapper>
                    <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE}/>
                    <Input
                        placeholder="Choose a new password..."
                        type="password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}" 
                        title="At least 6 characters, including a number, an uppercase letter and a lowercase letter." 
                        onChange={ (e) => setPassword2(e.target.value) }
                    />
                </InputWrapper>

                <Button disabled={password != password2} type="submit">Reset your password</Button>
            </Form>
        </Wrapper>
    </Container>
    )
}