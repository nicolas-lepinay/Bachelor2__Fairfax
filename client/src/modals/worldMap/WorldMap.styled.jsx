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

    @media ${device.mobile_XL} { 
        max-height: 550px;
    }
`
