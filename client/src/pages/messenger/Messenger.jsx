// React :
import { useContext, useState, useEffect, useRef } from 'react'

// Styled components :
import { Container, Wrapper, Menu, Box, Online, Searchbar, BoxTop, BoxBottom, TextArea, Button, NoChat } from "./Messenger.styled"

// React components :
import Navbar from "../../components/navbar/Navbar";
import Conversation from '../../components/conversation/Conversation'
import Message from "../../components/message/Message.jsx";
import ChatOnline from '../../components/ChatOnline/ChatOnline';

// UserContext :
import { UserContext } from "../../context/UserContext";

// Axios :
import axios from "axios";

function Messenger({ socket }) {
    // 🦸‍♀️ UseContext :
    const { user } = useContext(UserContext);
    
    // UseStates :
    const [conversations, setConversations] = useState([]); // [ ID de l'utilisateur + celui de l'interlocuteur ]
    const [chat, setChat] = useState(null);                 // Objet d'objets { users, messages, ... }
    const [messages, setMessages] = useState([]);           // [ Array de messages ]
    const [newMessage, setNewMessage] = useState("");       // Nouveau message expédié
    const [arrivalMessage, setArrivalMessage] = useState(null); // Nouveau message reçu
    const [onlineUsers, setOnlineUsers] = useState([]);

    // ✒️ UseRef :
    const scrollRef = useRef(null); // Auto-scroll to last message

    // 📜 Fetch user's conversations list :
    useEffect( () => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`/conversations/${user._id}`);
                //setConversations(res.data);
                res.data.forEach( (conversation) => {
                    conversation.messages.length > 0 && setConversations(old => [...old, conversation]); // Je n'affiche que les conversations non-vides (au moins 1 message)
                })
            } catch (err) {
                console.log(err)
            }
        }
        getConversations();
    }, [user]);

    // 💬 Fetch current chat's messages :
    useEffect( () => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`/messages/${chat?._id}`);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        chat && getMessages(); // Si chat est non null
    }, [chat]);

    // 🖱️ Scroll to last message :
    useEffect( () => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    // 🔌 Socket.io :
    useEffect( () => {        
        // Récupération de chaque nouveau message reçu :
        socket?.on('getMessage', (data) => {
            setArrivalMessage({
                userId: data.senderId,
                content: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect ( () => {
        if(arrivalMessage && chat?.users.includes(arrivalMessage.userId)) {
            setMessages([...messages, arrivalMessage]);
        }
    }, [arrivalMessage, chat]);

    // 🦸 Fetch online friends :
    useEffect( () => {
        socket?.emit("MESSENGER_addUser", user._id); // Envoi de l'ID du user loggé au socket server
        socket?.on("MESSENGER_getUsers", (users) => {
            setOnlineUsers(user.following.filter(friendId => users.some(u=>u.userId === friendId)));
        })
    }, [user]);

    // 📧 Post a new message :
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            userId: user._id,
            content: newMessage,
            conversationId: chat._id
        };
        
        const receiverId = chat.users.find(memberId => memberId !== user._id);

        socket.emit('sendMessage', {
            senderId: user._id,
            receiverId: receiverId,
            text: newMessage,
        });     

        try {
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage(""); // Clear the textarea
        } catch(err) {
            console.log(err);
        }
    }
        
    return (
        <div style={{display: 'flex', backgroundColor: '#f8f8fb' }}>
            <Navbar socket={socket} />
            <Container>
                <Menu>
                    <Wrapper>
                        <Searchbar placeholder="Search for friends"/>

                        {conversations.map(c => (
                            <div onClick={ () => setChat(c)}>
                                <Conversation conversation={c}/>
                            </div>
                        ))}
                    </Wrapper>
                </Menu>

                <Box>
                    <Wrapper className="box__wrapper">
                        {chat ?
                        <>
                            <BoxTop>
                                {messages.map( (message, i) => (
                                    <div ref={scrollRef}>
                                        <Message message={message} own={message.userId === user._id} key={`msg-${i}`}/>
                                    </div>
                                ))}
                            </BoxTop>
                            <BoxBottom>
                                <TextArea
                                    placeholder="Write a message..."
                                    onChange={ (e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                    ></TextArea>
                                <Button onClick={handleSubmit}>Send</Button>
                            </BoxBottom>
                        </>
                        : <NoChat>Open a conversation to start a chat.</NoChat>
                        }
                    </Wrapper>
                </Box>

                <Online>
                    <Wrapper>
                        <ChatOnline 
                            onlineUsers={onlineUsers}
                            currentUserId={user._id}
                            setChat={setChat} 
                        />
                    </Wrapper>
                </Online>

            </Container>
        </div>
    )
}

export default Messenger
