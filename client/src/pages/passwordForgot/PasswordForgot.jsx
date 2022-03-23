import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

// 💅🏻 Styled Components :
import { MATERIAL_STYLE, Container, Wrapper, Heading, Ornament, Form, Subheading, InputWrapper, Input, Button } from './PasswordForgot.styled';

// 🤍 FontAwesome :
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 🅰️ Axios :
import axios from "axios"

export default function PasswordForgot() {

    const [email, setEmail] = useState('');
    const history = useHistory();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const emailRecup = {
                email: email
            }
            await axios.post("/auth/passwordForgot", emailRecup);
            alert(`An email was send to ${email} for you to reset your password.`)
            history.push('/')
        } catch(err) {
            alert("An error occured while attempting to reset your password.")
            console.log(err)
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
                <Subheading>Email address</Subheading>
                <InputWrapper>
                    <FontAwesomeIcon icon={faEnvelope} style={MATERIAL_STYLE}/>
                    <Input
                        placeholder="Enter your email address"
                        type="email"
                        onChange={ (e) => setEmail(e.target.value)}
                        required 
                    />
                </InputWrapper>

                <Button type="submit">Reset your password</Button>
            </Form>
        </Wrapper>
    </Container>
    )
}