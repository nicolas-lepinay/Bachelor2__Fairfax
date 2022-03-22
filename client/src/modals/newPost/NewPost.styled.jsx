import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;

export const dropIn = {
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

// Draft Text Editor :
export const wrapperStyle = {
    // margin: '1.5rem 0'
}

export const editorStyle = {
    // backgroundColor:'rgb(255, 255, 255)',
    // border: '1px solid rgb(245, 245, 245)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    fontSize: '15px',
    lineHeight: '1.7',
    padding: '0.5rem 1rem 4rem 0rem',
}

export const toolbarStyle = {
    backgroundColor:'transparent',
    border: '1px solid rgb(255, 255, 255)',
    marginBottom: '10px',
}

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

export const Backdrop = styled(props => <motion.div {...props} />)`
    background: transparent;
    height: 100vh;
    max-height: 1000px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: fixed;
    width: 100vw;
    overflow-y: auto;
`

export const ModalContainer = styled.div`
    background-color: rgb(250, 250, 250);
    background-image: url('${ASSETS}/modal-illustration.png');
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 45%;
    border-radius: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    clip-path: path('M30.723868,23.5811095 C144.050861,7.86036983 257.377853,0 370.704846,0 C484.031838,0 597.358831,7.86036982 710.685823,23.5811095 L710.685823,23.5811095 C717.704865,24.5547922 723.272289,32.000975 724.059029,41.467178 C735.626137,180.644785 741.409692,319.822393 741.409692,459 C741.409692,598.177607 735.626137,737.355214 724.059029,876.532821 L724.05903,876.532821 C723.27229,885.999025 717.704865,893.445208 710.685824,894.418891 C597.358831,910.139631 484.031838,918 370.704846,918 C257.377853,918 144.050861,910.139631 30.7238682,894.418891 L30.7238682,894.41889 C23.7048271,893.445208 18.1374026,885.999025 17.3506626,876.532822 C5.7835542,737.355215 0,598.177607 0,459 C0,319.822393 5.78355416,180.644786 17.3506625,41.4671796 L17.3506612,41.4671794 C18.1374013,32.0009757 23.7048263,24.5547922 30.723868,23.5811095 Z');
    height: 918px;
    margin: 4rem auto;
    padding: 200px 8rem 3rem 8rem;
    position: relative;
    overflow: auto;
    width: 742px;
    & > svg {
        cursor: pointer;
        display: block;
        right: 70px;
        opacity: 0.5;
        position: absolute;
        top: 60px;
        transition: opacity 0.3s ease-in-out;
        &:hover {
            opacity: 1;
        }
    }
    & > h2 {
        font-family: 'Bluu Next', serif;
        font-size: 3rem;
        padding-bottom: 1rem;
    }
    & > p {
        color: #726c81;
        font-size: 0.9rem;
    }
    & button {
        background-color: #ef4b6c;
        border: none;
        border-radius: 200px;
        box-shadow: 10px 16px 40px 0 rgba(255,84,117,.46);
        color: white;
        cursor: pointer;
        font-size: 0.8rem;
        letter-spacing: 1px;
        margin: 4rem 0 2rem 0;
        outline: none;
        padding: 8px 20px;
        position: relative;
        text-transform: uppercase;
        transition: all 0.2s ease-in-out;
        &:hover {
            background-color: #df4664;
        }
    }
    @media ${device.mobile_XL} { 
        border-radius: 0;
        clip-path: unset;
        height: 100vh;
        margin: auto;
        width: 100vw;
    }
`

export const Title = styled.input`
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 1rem;
    margin: 2rem 0 4rem 0;
    outline: none;
    padding: 1rem 1rem 1rem 0;
    width: 100%;
`
