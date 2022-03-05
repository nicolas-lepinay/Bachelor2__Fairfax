// 🌌 React :
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// 🚧 React Component :
import NavbarNude from '../../components/navbar/NavbarNude.jsx';

// 💅🏻 Styled Components :
import { MATERIAL_STYLE, shake, Container, Wrapper, Heading, Ornament, Form, Subheading, Avatar, InputWrapper, Input, Button, ErrorMessage } from './Settings.styled';

// 🦸 User Context :
import { UserContext } from "../../context/UserContext";

// 🤍 FontAwesome :
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 🅰️ Axios :
import axios from "axios";

export default function Settings(){

    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    const history = useHistory();
    
    // 🦸 Utilisateur connecté :
    const { user, setUser } = useContext(UserContext);

    // 🖼️ Avatar uploadé :
    const [file, setFile] = useState(null);

    // New data :
    const [email, setEmail] = useState(null);
    const [currentPassword, setCurrentPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);

    // Error :
    const [error, setError] = useState(null);

    // Input refs (for shaking animation):
    const emailInput = useRef();
    const currentPasswordInput = useRef();
    const newPasswordInput = useRef();

    // Check if email already exists or not :
    const emailExists = async () => {
        try {
            const res = await axios.get(`/users?email=${email}`);
            setError('email');
            shakeInput(emailInput);
            return true;
        } catch(err) {
            setError(null);
            return false;
        }
    }

    // Check if current password is correct :
    const passwordIsCorrect = async () => {  
        // If either current pwd or new pwd is empty, return false :
        if(!currentPassword || !newPassword) return false;  
           
        try {
            const res = await axios.post("/auth/login", { identifier: user.username, password: currentPassword });
            setError(null);
            return true;
        } catch(err) {
            shakeInput(currentPasswordInput);
            setError('currentPassword')
            return false;
        }
    }

    // Check if new password is valid :
    const newPasswordIsValid = (pwd) => {
        const minLength = (str) => str.length >= 5
        const lowerCase = (str) => /[a-z]/g.test(str)
        const upperCase = (str) => /[A-Z]/g.test(str)
        const digit = (str) => /\d+/g.test(str)

        return minLength(pwd) && lowerCase(pwd) && upperCase(pwd) && digit(pwd);
    }

    // [EMAIL] : Set email on change and set error if new password has invalid pattern :
    const handleEmailChange = (email) => {
        setEmail(email);
        error === 'email' && setError(null);
    }

    // [CURRENT PASSWORD] : Set current password on change and set error if new password has invalid pattern :
    const handleCurrentPasswordChange = (pwd) => {
        setCurrentPassword(pwd);
        error === 'currentPassword' && setError(null);
    }

    // [NEW PASSWORD] : Set new password on change and set error if new password has invalid pattern :
    const handleNewPasswordChange = (pwd) => {
        setNewPassword(pwd);
        if(newPasswordIsValid(pwd) || !pwd) {
            setError(null)
        } else {
            setError('newPassword')
            shakeInput(newPasswordInput)
        }
    }

    // Set avatar preview when user uploads a new avatar :
    const handleImageUpload = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0]
        };
        setFile(img);
    }

    // Send data to server :
    const handleSubmit = async (e) => {
        e.preventDefault();

        // If email input was filled, check if email already exists or not :
        if(email && await emailExists()) return;
        // If currentPwd or newPwd was filled, check if current pwd is correct :
        if((newPassword || currentPassword) && await passwordIsCorrect() == false) return;

        let data = { userId: user._id }

        data = { ...data, 
            ...email && { email }, 
            ...currentPassword && { currentPassword },
            ...newPassword && { password: newPassword } };

        // Upload new avatar :
        if(file) {
            const formData = new FormData();
            const date = new Date(Date.now()).getTime(); // Date en millisecondes
            const fileName = user.slug + '_' + date + '_' + file.data.name;
            formData.append("name", fileName);
            formData.append("file", file.data);

            try {
                await axios.post("/upload/avatar", formData)
            } catch (err) {
                console.log(err)
            }
            // Add new avatar's filename to data :
            data.avatar = fileName;
        }
        // Send data to server :
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'token' : user.accessToken
        }

        try {
            // Update user in database :
            const updatedUser = await axios.put(`/users/${user._id}`, data, { headers } );
            // Update user object in React :
            setUser(updatedUser.data);
            // Update user object in local storage :
            localStorage.setItem("fairfax_user", JSON.stringify(updatedUser.data));
            // Redirection :
            history.push(`/profile/${user.slug}`);
        } catch (err) {
            console.log(err)
            alert('Oops! We encountered an error trying to update your account.\n\nError: ' + err);
        }
    }

    // Shaking input (invalid submition) :
    const shakeInput = (inputRef) => {
        inputRef.current.style.animation = `${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both`;
        inputRef.current.style.transform = `translate3d(0, 0, 0)`;
        inputRef.current.style.perspective = '1000px';
        setTimeout(function() {
            inputRef.current.style = null;
        }, 1500);
    }

    return (
        <>
            <NavbarNude/>
            <Container>
                <Link to={`/profile/${user.slug}`}>
                    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" stroke="#ffffff" strokeWidth={2} d="M3,3 L21,21 M3,21 L21,3"/>
                    </svg>
                </Link>
                <Wrapper>
                    <Heading>Settings</Heading>
                    <Ornament>
                        <span className="line left"></span>
                        <span className="diamond"></span>
                        <span className="line right"></span>
                    </Ornament>
                    <Form encType="multipart/form-data" onSubmit={handleSubmit} id='my-form'>
                        <Subheading>Profile picture</Subheading>
                        <Avatar htmlFor='file-input' >
                            <img
                                src={file?.preview ? `${file.preview}` : `${MEDIA}/profile/${user?.avatar || 'defaultAvatar.jpg'}`}
                                title="Upload a new profile picture"/>
                        </Avatar>
                        <input
                            onChange={handleImageUpload}
                            id="file-input"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                        />
                        <Subheading>Username</Subheading>
                        <InputWrapper>
                            <FontAwesomeIcon icon={faUser} style={MATERIAL_STYLE}/>
                            <Input value={user.username} style={{pointerEvents: 'none'}} disabled />
                        </InputWrapper>
                        <Subheading>Email address</Subheading>
                        <InputWrapper>
                            <FontAwesomeIcon icon={faEnvelope} style={MATERIAL_STYLE}/>
                            <Input
                                placeholder={user.email}
                                type="email"
                                onChange={ (e) => handleEmailChange(e.target.value) }
                                className={error === 'email' ? 'error' : ''}
                                innerRef={emailInput}
                            />
                        </InputWrapper>
            
                        {error === 'email' && <ErrorMessage className="error">This email address is already in use.</ErrorMessage>}

                        <Subheading>New password</Subheading>
                        <InputWrapper>
                            <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE}/>
                            <Input
                                placeholder="Choose a new password..."
                                type="password"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}" 
                                title="At least 6 characters, including a number, an uppercase letter and a lowercase letter." 
                                className={error === 'newPassword' ? 'error' : ''}
                                onChange={ (e) => handleNewPasswordChange(e.target.value) }
                                innerRef={newPasswordInput}
                            />
                        </InputWrapper>

                        {error === 'newPassword' && <ErrorMessage className="error">Password must have at least 6 characters, an uppercase, a lowercase and a digit.</ErrorMessage>}

                        <Subheading>Current password</Subheading>
                        <InputWrapper>
                            <FontAwesomeIcon icon={faLock} style={MATERIAL_STYLE}/>
                            <Input
                                placeholder="Type your current password..."
                                type="password"
                                onChange={ (e) => handleCurrentPasswordChange(e.target.value) }
                                className={error === 'currentPassword' ? 'error' : ''}
                                innerRef={currentPasswordInput}
                                disabled={!newPassword}
                            />
                        </InputWrapper>

                        {error === 'currentPassword' && <ErrorMessage className="error">Oops! Password is incorrect.</ErrorMessage>}

                        <Button disabled={(!email && !currentPassword && !newPassword) || error || (newPassword && !currentPassword) || (!newPassword && currentPassword)}>Apply changes</Button>
                    </Form>
                </Wrapper>
            </Container>
        </>
    );
};