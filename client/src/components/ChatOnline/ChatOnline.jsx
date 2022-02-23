import React, { useState, useEffect } from 'react';
import { Container, Friend, Wrapper, Image, Badge, Name} from "./ChatOnline.styled"
import axios from "axios";

const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

function ChatOnline({ onlineUsers, currentUserId, setChat }) {

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(`/users/friends/${currentUserId}`);
            setFriends(res.data);
        };
        getFriends();
    }, [currentUserId]);

    useEffect(() => {
        setOnlineFriends(friends.filter( (friend) => onlineUsers.includes(friend._id) ));
    }, [friends, onlineUsers]);

    const handleClick = async (friend) => {
        try {
            const res = await axios.get(`/conversations/find/${currentUserId}/${friend._id}`);
            // Si une conversation existe :
            res.data && setChat(res.data);

            // Si aucune conversation n'existe, j'en crée une :
            if(!res.data) {
                const response = await axios.post(`/conversations`, { senderId: currentUserId, receiverId: friend._id } );
                setChat(response.data);
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <Container>
            {onlineFriends.map( (friend) => (
                <Friend onClick={() => handleClick(friend)}>
                    <Wrapper>
                        <Image 
                            src={friend?.avatar ? `${MEDIA}/profile/${friend.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`}
                            alt=""
                            title={friend?.username}
                            />
                        <Badge/>
                    </Wrapper>
                    <Name>{friend?.username}</Name>
                </Friend>
            ))}
        </Container>
    )
}

export default ChatOnline
