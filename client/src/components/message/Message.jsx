import React, { useState, useEffect } from 'react'
import { Container, Top, Bottom, Image, Text } from "./Message.styled"
import { format } from "timeago.js";
import axios from "axios";


const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

function Message({ message, own }) {

    const [user, setUser] = useState({}); // Auteur du message

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/users?userId=${message.userId}`);
                setUser(res.data);

            } catch(err) {
                console.log(err);
            }
        }
        getUser();
    }, [message])

    return (
        <Container className={own && "own"}>
            <Top>
                <Image src={user?.avatar ? `${MEDIA}/profile/${user.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`} alt=""/>
                <Text>{message.content}</Text>
            </Top>
            <Bottom>{format(message.createdAt)}</Bottom>
        </Container>
    )
}

export default Message
