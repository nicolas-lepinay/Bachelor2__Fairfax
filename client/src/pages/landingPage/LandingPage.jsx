import React from 'react'
import "./landingPage.css"

function LandingPage() {

    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;

    return (
        <div className="main">
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
                <span className="menu">Sign in</span>
            </div>

            <div className="text">
                <div className="title">Claim your Wizard Passport</div>
                <div className="description">Fairfax is a new, exciting social experience. Join a coven of wizards, explore a magical city full of mysterious characters and accomplish quests to collect items and uncover secrets.</div>
                <div className="buttons">
                    <button className="signup__button button">Sign up</button>
                    <a href="/home" className="enter__button button">Enter</a>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
