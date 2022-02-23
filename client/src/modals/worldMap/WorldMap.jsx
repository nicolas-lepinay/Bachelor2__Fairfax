// React :
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Portal :
import ReactDom from 'react-dom';

// Framer Motion :
import { motion } from 'framer-motion';

// Styled components :
import { Backdrop, ModalWrapper, ModalContainer } from "./WorldMap.styled"

// Axios :
import axios from "axios";

function WorldMap({ handleClose }) {

    const [categories, setCategories] = useState([]);

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
                        <ModalContainer>
                            <div style={{display:'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
                            <h2>World Map</h2>
                                {categories.map(category =>(
                                <p className="sidebarListItem" key={category._id}>
                                    <Link 
                                        to={`/category/${category.slug}`} style={{textDecoration: "none"}} 
                                        onClick={handleClose}>
                                        <span className="sidebarListItemText">{category.name}</span>
                                    </Link>
                                </p>
                                ))}
                            </div>
                        </ModalContainer>
                    </ModalWrapper>
                </motion.div>
            </Backdrop>,
        document.getElementById('portal')
    )
}

export default WorldMap;
