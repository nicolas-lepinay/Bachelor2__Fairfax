import React, { useContext, useState, useEffect, useRef } from 'react'
import { UserContext } from "../../context/UserContext";

import { io } from "socket.io-client";

function Socket() {

    const { user } = useContext(UserContext);

    // 🔌 WebSocket :
    const [socket, setSocket] = useState({});

    // 🔌 Socket.io :
    useEffect( () => {
        setSocket(io("ws://localhost:9000"));
    }, []);

    // 🦸 Fetch online friends :
    useEffect( () => {
        user && socket?.emit("MESSENGER_addUser", user._id); // Envoi de l'ID du user loggé au socket server
    }, [user]);

    return (
        <>
        </>
    )
}

export default Socket
