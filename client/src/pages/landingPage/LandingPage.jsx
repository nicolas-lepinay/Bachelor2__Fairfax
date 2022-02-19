import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

import "./landingPage.css"

import LoginModal from "../../modals/loginModal/LoginModal.jsx";

function LandingPage() {

    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        document.getElementById('root').style.transition = '0.8s filter ease-in-out';
        document.getElementById('root').style.filter = 'blur(15px)';
    }

    const closeModal = () => {
        setIsOpen(false);
        document.getElementById('root').style.filter = 'blur(0px)';
    }

    return (
        <>
        <div className="landing__page">
            <div className="images">
                <img className="background" src={`${ASSETS}/landing_page/background.svg`}/>
                <div className="foreground__wrapper">
                    <img className="foreground hovering" src={`${ASSETS}/landing_page/foreground.svg`}/>
                    <img className="foreground__mobile hovering" src={`${ASSETS}/landing_page/foreground_mobile.svg`}/>
                </div>
            </div>

            <div className="header">
                <span className="logo golden_text">Fairfax</span>
                <a href="/home" className="menu">Home</a>
                <span className="menu" onClick={openModal}>Sign in</span>
            </div>

            <div className="text">
                <div className="title">Claim your Wizard Passport</div>
                <div className="description">Fairfax is a new, exciting social experience. Join a coven of wizards, explore a magical city full of mysterious characters and accomplish quests to collect items and uncover secrets.</div>
                <div className="buttons">
                    <button className="signup__button button" onClick={openModal}>Sign up</button>
                    <a href="/home" className="enter__button button">Enter</a>
                </div>
            </div>
        </div>

        <AnimatePresence 
            initial={false} 
            exitBeforeEnter={true} 
            onExitComplete={() => null}
        >
            {isOpen && <LoginModal isOpen={isOpen} handleClose={closeModal} />}
        </AnimatePresence>

        </>
    )
}

export default LandingPage
