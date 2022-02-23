import {useState, useEffect, useContext} from 'react'
import { Container, Image, Name } from "./Conversation.styled"
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

function Conversation( { conversation }) {
    const { user: currentUser } = useContext(UserContext); // User loggé
    const [user, setUser] = useState({}); // Interlocuteur dans la conversation

    useEffect(() => {
        // ID de l'interlocuteur :
        const userId = conversation.users.find( (id) => id != currentUser._id);

        // Interlocuteur :
        const getUser = async () => {
            try {
                const res = await axios.get(`/users?userId=${userId}`);
                setUser(res.data);

            } catch(err) {
                console.log(err);
            }
        }
        getUser();
    }, [currentUser, conversation])

    return (
        <Container>
            <Image src={user?.avatar ? `${MEDIA}/profile/${user.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`}/>
            <Name>{user?.username}</Name>
        </Container>
    )
}

export default Conversation
