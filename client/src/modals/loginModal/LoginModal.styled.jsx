import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;

const theme = {
    buttonColor: 'rgb(114,105,192)',
    buttonColorDarker: '#5349AD',
    inputColor: 'rgba(255, 253, 248, 0.3)',
    mainFontURL: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
    mainFont: '"Poppins", sans-serif',
    titleFontURL: 'https://fonts.googleapis.com/css2?family=Average&display=swap',
    titleFont: '"Average", serif',
    gold : {
        color: 'rgb(172, 155, 108)',
        gradient: `radial-gradient(circle,rgba(222, 208,160,1) 0%,rgba(167,150,102,1) 100%)`
    }
}

const slide = keyframes`
    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }
    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
`

export const shake = keyframes`
    10%, 90% {
      transform: translate3d(-4px, 0, 0);
    }
    20%, 80% {
      transform: translate3d(8px, 0, 0);
    }
    30%, 50%, 70% {
      transform: translate3d(-16px, 0, 0);
    }
    40%, 60% {
      transform: translate3d(16px, 0, 0);
    }
`

const size = {
    tablet_XL: '960px',
    tablet_L: '830px',
    tablet_M: '730px',
    tablet_S: '630px',
    mobile_XL: '500px',
    mobile_L: '460px',
    mobile_M: '400px'
}

const device = {
    tablet_XL: `(max-width: ${size.tablet_XL})`,
    tablet_L: `(max-width: ${size.tablet_L})`,
    tablet_M: `(max-width: ${size.tablet_M})`,
    tablet_S: `(max-width: ${size.tablet_S})`,
    mobile_XL: `(max-width: ${size.mobile_XL})`,
    mobile_L: `(max-width: ${size.mobile_L})`,
    mobile_M: `(max-width: ${size.mobile_M})`
};
  
export const MATERIAL_STYLE = {
    color: "black",
    left: "20px",
    top: "49%",
    opacity: "0.15",
    position: "absolute",
    transform: "translateY(-50%)"
}

export const CHECK_STYLE = {
    color: "green",
    left: "-30px",
    top: "49%",
    position: "absolute",
    transform: "translateY(-50%)"
}

export const SVG = styled.div`
    color: rgba(0, 0, 0, 0.8s);
    width: 0.9rem;
    height: 0.9rem;
    margin-right: 15px;
    @media ${device.tablet_S} { 
        display: none;
    }
`

export const OverlayContainer = styled.div`
    height: 100%;
    left: 50%;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 50%;
    z-index: 100;
    transition: transform 0.6s ease-in-out;
`

export const Overlay = styled.div`
    /* background: ${theme.gold.gradient}; */
    background: ${theme.buttonColor};
    color: white;
    height: 100%;
    left: -100%;
    position: relative;
    width: 200%;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;

    &:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background-image: url('${ASSETS}/landing_page/furniture2.svg');
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: cover;
    }
`

export const Panel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    &.left {
        transform: translateX(-20%);
    }
    &.right {
        right: 0;
        transform: translateX(0);
    }
    @media ${device.mobile_M} { 
        padding: 0 20px;
    }
`

export const Description = styled.p`
    font-size: 1rem;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;

    @media ${device.mobile_XL} { 
        font-size: 0.8rem;
    }
    @media ${device.mobile_L} { 
        display: none;
    }
`

export const Backdrop = styled(props => <motion.div {...props} />)`
    align-items: center;
    background: transparent;
    display: flex;
    justify-content: center;
    height: 100%;
    left: 50%;
    position: fixed;
    top: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
`

export const ModalWrapper = styled.div`
    @import url(${theme.mainFontURL});
    font-family: ${theme.mainFont};
    z-index: 1000;
    transition: 0.6s ease-out;
`

export const ModalContainer = styled.div`
    background-color: rgb(250, 250, 250);
    border-radius: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    max-width: 90vw;
    min-width: 300px;
    height: 600px;
    position: relative;
    overflow: hidden;
    width: 960px;
    &.right__panel__active .signin {
        transform: translateX(100%);
    }
    &.right__panel__active .signup {
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
        animation: ${slide} 0.6s;
    }
    &.right__panel__active ${OverlayContainer} {
        transform: translateX(-100%);
    }
    &.right__panel__active ${Overlay} {
        transform: translateX(50%);
    }
    &.right__panel__active .left {
        transform: translateX(0);
    }
    &.right__panel__active .right {
        transform: translateX(20%);
    }

    @media ${device.mobile_XL} { 
        max-height: 550px;
    }
`

export const FormWrapper = styled.div`
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 50%;
    transition: all 0.6s ease-in-out;
    &.signin {
        z-index: 2;
    }
    &.signup {
        /* opacity: 0; */
        z-index: 1;
    }
`

export const Form = styled.form`
    background-color: rgb(250, 250, 250);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
`

export const Title = styled.h1`
    font-family: "MasonSansRegular";
    font-size: 2.3rem;
    font-weight: 600;
    margin-bottom: 20px;
    &.golden {
        font-size: 2.4rem;
        background: #ac9b6c;
        background-image: -webkit-radial-gradient(circle, #ded0a0 0%, #a79666 100%);
        background-image: -moz-radial-gradient(circle, #ded0a0 0%, #a79666 100%);
        background-image: -ms-radial-gradient(circle, #ded0a0 0%, #a79666 100%);
        background-image: -o-radial-gradient(circle, #ded0a0 0%, #a79666 100%);
        background-image: radial-gradient(circle, #ded0a0 0%, #a79666 100%);
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
    }
    &:not(.golden) {
        text-shadow: 0 0 3px rgba(255, 255, 255, 0.6);
    }

    @media ${device.mobile_XL} { 
        font-size: 1.8rem;
    }
    @media ${device.mobile_M} { 
        font-size: 1.5rem;
    }
`

export const InputAndIcon = styled.div`
    position: relative;
`

export const LinkAndIcon = styled.div`
    align-items: baseline;
    display: flex;
    justify-content: center;
    opacity: 0.5;
    margin: 10px 0 80px 0;
    & a {
        color: black;
        font-size: 0.8rem;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
    @media ${device.tablet_S} { 
        margin: 10px 0 40px 0;

    }
`

export const Input = styled.input`
    background-color: ${theme.inputColor};
    border-color: transparent;
    border: 1px solid rgb(241, 238, 255);
    border-radius: 3px;
    color: rgb(0, 0, 0);
    font-size: 80%;
    margin: 10px 0px;
    min-width: 250px;
    max-width: 40vw;
    outline: none;
    padding: 12px 18px 12px 55px;
    text-shadow: 0 0 3px rgba(255, 255, 255, 0.6);
    &::placeholder {
        color: rgb(59, 59, 59);
        font-size: 85%;
        opacity: 0.5;
        text-transform: uppercase;
    }

    @media ${device.tablet_S} { 
        padding: 12px 12px 12px 40px;
        max-width: 180px;
        min-width: 50px;
        &::placeholder {
            font-size:70%;
        }    
    }
    @media ${device.mobile_XL} { 
        min-width: 50px;
    }
`

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    font-size: 0.8rem;
    text-shadow: 0 0 2px rgba(255, 255, 255, 0.5);
    margin-top: 20px;
    margin-bottom: 40px;

    @media ${device.tablet_S} { 
        display: none;  
    }
`

export const Requirements = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
    margin-top: 13px;
`

export const TextAndIcon = styled.span`
    position: relative;
`

export const Button = styled(props => <motion.button {...props} />)`
    background-color: ${theme.buttonColor};
    border: 1px solid ${theme.buttonColor};
    border-radius: 50px;
    color: white;
    cursor: pointer;
    font-size: 12px;
    padding: 12px 45px;
    letter-spacing: 2px;
    text-transform: uppercase;
    outline: none;
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: ${theme.buttonColorDarker};
    }
    &.ghost {
        background-color: transparent;
        border: 1px solid white;
        font-weight: 600;
        transition: all 0.3s ease-in-out;
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        @media ${device.tablet_S} { 
            margin-top: 10px; 
        }
        @media ${device.mobile_XL} { 
            padding: 12px 30px;
        }
        @media ${device.mobile_L} { 
            margin-top: 50px;
        }
    }

    @media ${device.tablet_S} { 
        border-radius: 50px;
        color: #ffffff;
        cursor: pointer;
        font-size: 9px;
        font-weight: bold;
        padding: 12px 25px;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    &:not(.ghost) {
        @media ${device.tablet_S} { 
            margin-top: 50px;
        }
    }
`

export const InvalidEntry = styled.span`
    font-size: 0.8rem;
    color: rgb(255, 0, 34);
    padding-top: 5px;
    text-shadow: 0 0 1px rgba(0, 0, 0, 1);

    @media ${device.tablet_M} { 
        font-size: 0.7rem;
    }
    @media ${device.mobile_XL} { 
        text-indent: -9999px;
        line-height: 0;
        &:after {
            content: "Your passwords do not match." !important;
            text-indent: 0;
            display: block;
            line-height: initial; 
        }  
    
    }
`

