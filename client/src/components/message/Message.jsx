import React from 'react'
import { Container, Top, Bottom, Image, Text } from "./Message.styled"
import { format } from "timeago.js";

const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

function Message({ message, own }) {
    return (
        <Container className={own && "own"}>
            <Top>
                <Image src={`${MEDIA}/profile/003.jpg`} alt=""/>
                <Text>{message.content}</Text>
            </Top>
            <Bottom>{format(message.createdAt)}</Bottom>
        </Container>
    )
}

export default Message
