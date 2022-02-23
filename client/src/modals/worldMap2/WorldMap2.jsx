// React :
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Portal :
import ReactDom from 'react-dom';

// Framer Motion :
import { motion } from 'framer-motion';

// Styled components :
import { Backdrop, ModalWrapper, ModalContainer } from "./WorldMap2.styled"

// Axios :
import axios from "axios";

// CSS :
import './worldMap2.css';

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
                    <ModalWrapper innerRef={modalWrapper}>

                    <div className="main-content" onClick={() => setToggleMap(true)}>
                        <div className={toggleMap ? "map-base active" : "map-base"}>
                            <div className="footsteps footsteps-1">
                                <div className="footstep left"></div>
                                <div className="footstep right"></div>
                                <div className="scroll-name">
                                    <p>Severus Snape</p>
                                </div>
                            </div>
                            <div className="footsteps footsteps-2">
                                <div className="footstep left"></div>
                                <div className="footstep right"></div>
                                <div className="scroll-name">
                                    <p>Harry Potter</p>
                                </div>
                            </div>
                            <div className="map-flap flap--1">
                                <div className="map-flap__front"></div>
                                <div className="map-flap__back"></div>
                            </div>
                            <div className="map-flap flap--2">
                                <div className="map-flap__front"></div>
                                <div className="map-flap__back"></div>
                            </div>
                            <div className="map-side side-1">
                                <div className="front"></div>
                                <div className="back"></div>
                            </div>
                            <div className="map-side side-2">
                                <div className="front"></div>
                                <div className="back"></div>
                            </div>
                            <div className="map-side side-3">
                                <div className="front"></div>
                                <div className="back"></div>
                            </div>
                            <div className="map-side side-4">
                                <div className="front"></div>
                            </div>
                            <div className="map-side side-5">
                                <div className="front"></div>
                                <div className="back"></div>
                            </div>
                            <div className="map-side side-6">
                                <div className="front"></div>
                                <div className="back"></div>
                            </div>
                        </div>
                    </div>

                    </ModalWrapper>
                </motion.div>
            </Backdrop>,
        document.getElementById('portal')
    )
}

export default WorldMap2;
