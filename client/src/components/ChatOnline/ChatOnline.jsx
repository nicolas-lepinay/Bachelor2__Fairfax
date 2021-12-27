import React from 'react';
import { Container, Friend, Wrapper, Image, Badge, Name} from "./ChatOnline.styled"

const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

function ChatOnline() {
    return (
        <Container>
            <Friend>
                <Wrapper>
                    <Image src={`${MEDIA}/profile/004.jpg`}/>
                    <Badge/>
                </Wrapper>
                <Name>Jamie Cooper</Name>
            </Friend>
        </Container>
    )
}

export default ChatOnline
