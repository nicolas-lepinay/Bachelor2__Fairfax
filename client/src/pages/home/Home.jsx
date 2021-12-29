import React, { useState, useEffect, useContext } from 'react';

import "./home.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

import { UserContext } from "../../context/UserContext"
import { io } from "socket.io-client";


export default function Home() {

    const { user, setUser } = useContext(UserContext);
    const [socket, setSocket] = useState(null);

    // 🔌 Socket.io :
    useEffect(() => {
        setSocket(io("ws://localhost:9000"));
    }, [])

    useEffect(() => {
        socket?.emit("newUser", user._id);
      }, [socket, user]);

    return ( 
        <>
            <Topbar socket={socket}/>
            <div className="homeContainer">
                <Sidebar/>
                <Feed socket={socket}/>
                <Rightbar/>
            </div>
        </>
    )
}