import { useContext, useState, useEffect, useRef } from 'react'

import { Container, Wrapper, Menu, Box, Online, Searchbar, BoxTop, BoxBottom, TextArea, Button, NoChat } from "./Messenger.styled"
import Topbar from "../../components/topbar/Topbar.jsx"
import Conversation from '../../components/conversation/Conversation'
import Message from "../../components/message/Message.jsx";
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import { UserContext } from "../../context/UserContext";

import axios from "axios";
import { io } from "socket.io-client";

function Messages() {
    // 🔌 WebSocket :
    const socket = useRef();

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
                setConversations(res.data)
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
        socket.current = io("ws://localhost:9000"); // Initialisation de la socket
        
        // Récupération de chaque nouveau message reçu :
        socket.current.on('getMessage', (data) => {
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
        socket.current.emit("addUser", user._id); // Envoi de l'ID du user loggé au socket server
        socket.current.on("getUsers", (users) => {
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

        socket.current.emit('sendMessage', {
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
        <>
            <Topbar/>
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
        </>
    )
}

export default Messages
