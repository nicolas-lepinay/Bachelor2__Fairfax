// 🌌 React :
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// 🌁 Portal :
import ReactDom from 'react-dom';

// 💅🏻 Styled Components :
import { Backdrop, ModalWrapper, MainContent, ScrollName, Footsteps, Foot, MapBase, MapFlap, MapSide } from "./WorldMap.styled"

// 🎬 Framer Motion :
import { motion } from 'framer-motion';

// 🅰️ Axios :
import axios from "axios";

// CSS :
import './worldMap.css';

function WorldMap2({ handleClose }) {

    const [categories, setCategories] = useState([]);
    const [toggleMap, setToggleMap] = useState(false);

    useEffect( () => {
        const getCategories = async () => {
            try {
                const categoryList = await axios.get("/categories/findAll");
                setCategories(categoryList.data);
            } catch (err) {
                console.log(err)
            }
        }
        getCategories();
    }, []);

    // Modal Wrapper :
    const modalWrapper = useRef();

    const dropIn = {
        hidden: {
            y: "-20vh",
            opacity: 0
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 30,
                stiffness: 500,
                mass: 2
            }
        },
        exit: {
            y: "-30vh",
            opacity: 0,
            transition: {
                duration: 0.6,
                type: "tween"
            }
        }
    }

    return ReactDom.createPortal (
            <Backdrop onClick={handleClose}>
                <motion.div
                    onClick={ (e) => e.stopPropagation() }
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <ModalWrapper innerRef={modalWrapper} className={toggleMap ? "active" : ""}>
                        <MainContent>
                            <MapBase className={toggleMap ? "active" : ""}>
                                <Footsteps className="footsteps-1">
                                    <Foot className="left"></Foot>
                                    <Foot className="right"></Foot>
                                    <ScrollName>
                                        <p>Ipsum</p>
                                    </ScrollName>
                                </Footsteps>

                                <Footsteps className="footsteps-2">
                                    <Foot className="left"></Foot>
                                    <Foot className="right"></Foot>
                                    <ScrollName>
                                        <p>Lorem</p>
                                    </ScrollName>
                                </Footsteps>

                                {/* <MapFlap className="flap--1">
                                    <div className="front"></div>
                                    <div className="back"></div>
                                </MapFlap>
                                
                                <MapFlap className="flap--2">
                                    <div className="front"></div>
                                    <div className="back"></div>
                                </MapFlap> */}

                                <MapSide className="side-1">
                                    <div className="front"></div>
                                    <div className="back"></div>
                                </MapSide>

                                <MapSide className="side-2">
                                    <div className="front"></div>
                                    <div className="back"></div>
                                </MapSide>

                                <MapSide className="side-3">
                                    <div className="front"></div>
                                    <div className="back"></div>
                                </MapSide>

                                <MapSide className="side-4">
                                    <div className="front"></div>
                                </MapSide>

                                <MapSide className="side-5">
                                    <div className="front"></div>
                                    <div className="back" onClick={() => setToggleMap(!toggleMap)}></div>
                                </MapSide>

                                <MapSide className="side-6">
                                    <div className="front"></div>
                                    <div className="back" onClick={() => setToggleMap(!toggleMap)}></div>

                                    <svg 
                                        width="20px" 
                                        height="20px" 
                                        viewBox="0 0 24 24" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        onClick={() => setToggleMap(false)}
                                        className={toggleMap ? "active" : ""}
                                        >
                                        <path fill="none" stroke="#ffffff" strokeWidth={2} d="M3,3 L21,21 M3,21 L21,3"/>
                                    </svg>
                                </MapSide>
                            </MapBase>
                        </MainContent>
                    </ModalWrapper>
                </motion.div>
            </Backdrop>,
        document.getElementById('portal')
    )
}

export default WorldMap2;
