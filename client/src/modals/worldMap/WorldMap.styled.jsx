import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;

const size = {
    tablet_XL: '960px',
    tablet_L: '830px',
    tablet_M: '730px',
    tablet_S: '630px',
    mobile_XL: '500px',
    mobile_L: '460px',
    mobile_M: '400px'
};

const device = {
    tablet_XL: `(max-width: ${size.tablet_XL})`,
    tablet_L: `(max-width: ${size.tablet_L})`,
    tablet_M: `(max-width: ${size.tablet_M})`,
    tablet_S: `(max-width: ${size.tablet_S})`,
    mobile_XL: `(max-width: ${size.mobile_XL})`,
    mobile_L: `(max-width: ${size.mobile_L})`,
    mobile_M: `(max-width: ${size.mobile_M})`
};

const footsteps0 = keyframes`
    10% { transform: translate(8px, -15px) rotate(30deg); }
    20% { transform: translate(30px, -45px) rotate(30deg); }
    30% { transform: translate(40px, -75px) rotate(20deg); }
    40% { transform: translate(45px, -100px) rotate(10deg); }
    50% { transform: translate(50px, -125px) rotate(10deg); }
    60% { transform: translate(50px, -135px) rotate(10deg); }
    100% { transform: translate(50px, -135px) rotate(20deg); }
`

const footsteps1 = keyframes`
    80% { transform: translate(-170px, -25px) rotate(-90deg); }
    100% { transform: translate(-180px, -25px) rotate(-90deg); }
`

const scroll1 = keyframes`
    10% { transform: translate(8px, -15px); }
    20% { transform: translate(30px, -45px); }
    30% { transform: translate(40px, -75px); }
    40% { transform: translate(45px, -100px); }
    50% { transform: translate(50px, -125px); }
    60% { transform: translate(50px, -135px); }
    100% { transform: translate(50px, -135px); }
`

const scroll2 = keyframes`
    80% { transform: translate(-170px, -25px); }
    100% { transform: translate(-180px, -25px); }
`

const height = 800;
const width = 408;

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
    overflow-x: scroll;
`

export const ModalWrapper = styled.div`
    transition: 0.6s ease-out;
    z-index: 1000;
    // Invisible scrollbar :
    -ms-overflow-style: none;   // Edge
    scrollbar-width: none;      // Firefox
    &::-webkit-scrollbar {      // Chrome, Safari
        display: none;
    }
    &.active {
        @media (max-width: 1200px) { 
            margin-left: 400px;
        }
        @media (max-width: 1000px) { 
            margin-left: 600px;
        }
        @media (max-width: 800px) { 
            margin-left: 500px;
        }
        @media (max-width: 600px) { 
            margin-left: 700px;
        }
        @media (max-width: 400px) { 
            margin-left: 900px;
        }
    }
`

export const MainContent = styled.div`
    margin: auto;
    text-align: center;
`

export const Octopus = styled.img`
    position: absolute;
    left: ${width * 1.700}px;
    opacity: 0;
    top: ${height * 0.120}px;
    visibility: hidden;
    width: 90px;
    z-index: 10;
    @media (max-width: 800px) { 
        left: ${width * 1.700 * 0.75}px;
        top: ${height * 0.120 * 0.75}px;   
        width: 65px; 
    }
`

export const Icon = styled.img`
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    width: 110px;
    @media (max-width: 800px) { 
        width: 83px;
    }
`

export const Ribbon = styled.div`
    position: absolute;
    background: url('${ASSETS}/map/ribbon.png') center center / cover;
    height: 62px;
    left: 50%;
    top: 62px;
    transform: translateX(-50%) rotate(-6deg);
    width: 140px;
    & > p {
        color: white;
        display: inline-block;
        font-size: 0.7rem;
        padding-top: 30px;
        text-align: center;
        transition: all 0.3s ease-in-out;
    }
    @media (max-width: 800px) { 
        top: 40px;
    }
`

export const Category = styled.div`
    cursor: pointer;
    opacity: 0;
    position: relative;
    visibility: hidden;
    z-index: 10;
    &:hover p {
        text-shadow: 0px 0px 8px rgba(255, 255, 255, 1);
    }
    // ✨ CAFE :
    &:nth-child(1) {
        top: ${height * 0.280}px;
        left: 0;
        & ${Icon} {
            top: -12px;
            width: 220px;
        }
        & ${Ribbon} {
        }
        @media (max-width: 800px) { 
            top: ${height * 0.280 * 0.75}px;
            & ${Icon} {
                top : -9px;
                width: 165px;
            }
        }   
    }
    // ✨ LIBRARY :
    &:nth-child(2) {
        top: ${height * 0.025}px;
        left: -${width * 0.250}px;
        & ${Icon} {
            top: 10px;
        }
        @media (max-width: 800px) { 
            top: ${height * 0.030 * 0.75}px;
            left: -${width * 0.250 * 0.75}px;  
            & ${Icon} {
                top: 9px;     
            }      
        }
    }
    // ✨ THEATER :
    &:nth-child(3) {
    top: ${height * 0.475}px;
    left: -${width * 0.375}px;
        & ${Icon} {
            top: 5px;
        }
        & ${Ribbon} {

        }
        @media (max-width: 800px) { 
            top: ${height * 0.475 * 0.75}px;
            left: -${width * 0.325 * 0.75}px;
            & ${Icon} {
                top: 5px;     
            }
        }
    }
    // ✨ ACADEMY :
    &:nth-child(4) {
    top: ${height * 0.720}px;
    left: ${width * 1.050}px;
        & ${Icon} {
            top: -40px;
        }
        & ${Ribbon} {

        }
        @media (max-width: 800px) { 
            top: ${height * 0.720 * 0.75}px;
            left: ${width * 1.050 * 0.75}px;
            & ${Icon} {
                top: -30px;     
            }
        }
    }
    // ✨ VINYL SHOP :
    &:nth-child(5) {
    top: ${height * 0.400}px;
    left: -${width * 1.420}px;
        & ${Icon} {
            top: -27px;
        }
        & ${Ribbon} {

        }
        @media (max-width: 800px) { 
            top: ${height * 0.400 * 0.75}px;
            left: -${width * 1.420 * 0.75}px;
            & ${Icon} {
                top: -20px;     
            }
        }
    }
    // ✨ MUSEUM :
    &:nth-child(6) {
    top: ${height * 0.720}px;
    left: -${width * 0.200}px;
        & ${Icon} {
            top: 24px;
        }
        & ${Ribbon} {

        }
        @media (max-width: 800px) { 
            top: ${height * 0.720 * 0.75}px;
            left: -${width * 0.200 * 0.75}px;
            & ${Icon} {
                top: 19px;     
            }
        }
    }
    // ✨ STADIUM :
    &:nth-child(7) {
    top: ${height * 0.105}px;
    left: -${width * 1.070}px;
        & ${Icon} {
            top: 12px;
        }
        & ${Ribbon} {
            /* filter: invert(100%) brightness(120%) contrast(96%);         */
        }
        @media (max-width: 800px) { 
            top: ${height * 0.105 * 0.75}px;
            left: -${width * 1.070 * 0.75}px;
            & ${Icon} {
                top: 8px;     
            }
        }
    }
    // ✨ PARLIAMENT :
    &:nth-child(8) {
    top: ${height * 0.450}px;
    left: ${width * 0.650}px;
        & ${Icon} {
            top: -33px;     
        }
        & ${Ribbon} {
        
        }
        @media (max-width: 800px) { 
            top: ${height * 0.450 * 0.75}px;
            left: ${width * 0.650 * 0.75}px;
            & ${Icon} {
                top: -25px;     
            }
        }
    }
    // ✨ WITCHES CLUB :
    &:nth-child(9) {
    top: ${height * 0.750}px;
    left: -${width * 1.650}px;
        & ${Icon} {
            top: 8px;
            width: 160px;
        }
        & ${Ribbon} {

        }
        @media (max-width: 800px) { 
            top: ${height * 0.750 * 0.75}px;
            left: -${width * 1.650 * 0.75}px;
            & ${Icon} {
                width: 120px;
            }
        }
    }
    // ✨ WIZARDS CLUB :
    &:nth-child(10) {
    top: ${height * 0.600}px;
    left: -${width * 1.050}px;
        & ${Icon} {
            top: 8px;
            width: 160px;
        }
        & ${Ribbon} {

        }
        @media (max-width: 800px) { 
            top: ${height * 0.600 * 0.75}px;
            left: -${width * 1.050 * 0.75}px;
            & ${Icon} {
                width: 120px;
            }
        }
    }
    &.locked {
        pointer-events: none;
        & ${Icon} {
            filter: brightness(70%);        
        }
        & ${Ribbon} {
            & span {
                display: none;
            }
            & p:after {
                content: '???';
            }
        }
    }
`

export const ScrollName = styled.div`
    /* background: url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/scroll.svg') center center / cover; */
    background: url('${ASSETS}/map/ribbon.png') center center / cover;
    bottom: 105px;
    /* color: #615349; */
    color: white;
    cursor: default;
    left: -60px;
    /* height: 30px; */
    /* height: 70px; */
    opacity: 0;
    position: absolute;
    text-align: center;
    /* transform: rotate(-10deg); */
    width: 150px;
    /* z-index: 10; */
    & p {
        display: inline-block;
        font-size: 0.8rem;
        padding-top: 33px;
        text-transform: uppercase;
    }
    & img {
        position: absolute;
        transform: rotate(10deg);
        bottom: 0;
        left: 0;
        width: 120px;
        z-index: -10;
    }
`

export const Foot = styled.div`
    background: #615349;
    border-radius: 80% 80% 70% 70%/130% 130% 25% 25%;
    /* height: 12px; */
    position: absolute;
    opacity: 0;
    width: 6px;
    z-index: 10;
    &:before {
        background: #615349;
        border-radius: 0 0 100% 100%;
        content: "";
        height: 5px;
        left: 0px;
        position: absolute;
        top: 110%;
        width: 5px;
    }
    &.left {
        transform: rotate(5deg);
    }
    &.right {
        transform: rotate(-3deg) translateY(15px) translateX(10px);
    }
`

export const Footsteps = styled.div`
    & img {
        width: 100px;
    }
    &.footsteps-0 > ${Foot} {
        &.left {
            bottom: 150px;
            left: 18px;
            transform: rotate(35deg);
        }
        &.right {
            bottom: 150px;
            left: 28px;
            transform: rotate(30deg);
        }
    }
    &.footsteps-1 > ${Foot} {
        &.left {
            bottom: 285px;
            left: 280px;
            transform: rotate(-90deg);
        }
        &.right {
            bottom: 275px;
            left: 285px;
            transform: rotate(-85deg);
        }
    }
    &.footsteps-1 > ${ScrollName} {
        bottom: 300px;
        left: 220px;
    }
`

export const MapFlap = styled.div`
    height: 25%;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 25%;
    transform-style: preserve-3d;
    width: 100%;
    transition: 0.5s ease;
    &.flap--1 {
        box-shadow: 0 -1px 20px rgba(255, 255, 255, 0.5);
        & > .front {
            /* background: url("https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/mini-1.png") center left / cover; */
            background: url('${ASSETS}/map/mini-1.png') center left / cover;
        }
        & > .back {
            /* background: url("https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/mini-3.png") -3px 0/ cover; */
            background: url('${ASSETS}/map/mini-3.png') -3px 0/ cover;
            width: calc(100% + 20px);
        }
    }
    &.flap--2 {
        box-shadow: 0 1px 20px rgba(255, 255, 255, 0.5);
        top: 50%;
        & > .front {
            /* background: url("https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/mini-2.png") center left / cover; */
            background: url('${ASSETS}/map/mini-2.png') center left / cover;
        }
        & > .back {
            /* background: url("https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/mini-4.png") -3px 0/ cover; */
            background: url('${ASSETS}/map/mini-4.png') -3px 0/ cover;
            width: calc(100% + 20px);
        }
    }
    & > .front, & > .back {
        backface-visibility: hidden;
        height: 100%;
        position: absolute;
        width: 100%;
    }
    & > .back {
        transform: scale(-1) rotateY(180deg);
    }

`

export const MapSide = styled.div`
    /* height: 600px; */
    height: ${height}px;
    position: absolute;
    top: 0;
    transform-style: preserve-3d;
    /* width: 153px; */
    width: ${width/2}px;
    transition: 0.3s ease;
    &.side-1 {
        left: 0;
        margin-left: 1.5px;
        & > .front {
            /* background-image: url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/8.png'); */
            background-image: url('${ASSETS}/map/8.png');
            
        }
    }
    &.side-2 {
        left: 50%;
        margin-left: -2px;
        & > .front {
            /* background-image: url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/18.png'); */
            background-image: url('${ASSETS}/map/18.png');
        }
    }
    &.side-3 {
        left: 0;
        margin-left: 3px;
        & > .front {
            /* background-image: url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/7.png'); */
            background-image: url('${ASSETS}/map/7.png');
        }
        & > .back {
            transform: rotateY(180deg);
        }
    }
    &.side-4 {
        left: 50%;
        margin-left: -1px;
        & > .front {
            /* background-image: url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/10.png'); */
            background-image: url('${ASSETS}/map/10.png');
        }
        & > .back {
            transform: rotateY(180deg);
        }
    }
    &.side-5 {
        left: 0;
        & > .front {
            /* background-image: url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/6.png'); */
            background-image: url('${ASSETS}/map/6.png');
        }
        & > .back {
            /* background-image: url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/1.png'); */
            background-image: url('${ASSETS}/map/1.png');
            cursor: pointer;
        }
    }
    &.side-6 {
        left: 50%;
        position: relative;
        & > .front {
            /* background-image: url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/11.png'); */
            background-image: url('${ASSETS}/map/11.png');
            /* background-size: 99.5%;*/
        }
        & > .back {
            /* background-image: url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/17.png'); */
            background-image: url('${ASSETS}/map/17.png');
            cursor: pointer;
        }
        & > svg {
            cursor: pointer;
            display: block;
            left: 35px;
            opacity: 1;
            position: absolute;
            top: 35px;
            transition: opacity 0.5s ease-in 1.5s;
            &:not(.active) {
                opacity: 0;
                transition: opacity 0.2s;
            }
        }
    }
    & > .front, & > .back {
        backface-visibility: hidden;
        /* background-image: var(--image); */
        background-position: left top;
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
        position: absolute;
        width: 100%;
    }
    & > .back {
        /* background-image: url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/back.png'); */
        background-image: url('${ASSETS}/map/back.png');
    }
    @media (max-width: 800px) { 
        height: ${height*0.75}px;
        width: ${(width/2)*0.75}px;
    }
`

export const MapBase = styled.div`
    /* background: url("https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/9.png") center center / cover; */
    background: url('${ASSETS}/map/9.png') center center / cover ;
    display: inline-block;
    /* height: 600px; */
    height: ${height}px;
    margin: auto;
    position: relative;
    /* width: 306px; */
    width: ${width}px;
    &.active {
        & ${MapFlap} {
            &.flap--1 {
                transform: rotateX(180deg);
                transform-origin: top center;
                transition: 0.6s transform 1.5s;
            }
            &.flap--2 {
                transform: rotateX(180deg);
                transform-origin: bottom center;
                transition: 0.6s transform 1.8s;
            }
        }
        & ${MapSide} {
            &.side-1 {
                transform-origin: center left;
                transform: rotateY(180deg) skewY(2deg);
                transition: 0.5s all ease-in-out 0.6s;
                & > .front {
                    transform: rotateY(180deg);
                }
            }
            &.side-2 {
                transform: rotateY(180deg) skewY(-2deg);
                transform-origin: center right;
                transition: 0.5s all ease-in-out 0.6s;
                & > .front {
                    transform: rotateY(180deg);
                }
            }
            &.side-3 {
                left: -50%;
                top: 10px;
                transform: skewY(2deg) translateX(-100%);
                transition: 0.5s transform ease 0.8s, 0.3s left ease 0.8s, 0.5s top ease 0.8s;
            }
            &.side-4 {
                left: 100%;
                margin-left: -7px;
                top: 10px;
                transform: skewY(-2deg) translateX(100%);
                transition: 0.5s transform ease 0.8s, 0.3s left ease 0.8s, 0.5s top ease 0.8s, 0.5s margin ease 0.8s;
            }
            &.side-5 {
                left: -100%;
                margin-left: 4px;
                top: 0px;
                transform-origin: center left;
                transform: rotateY(180deg);
                transition: 0.5s transform, 0.7s left 0.8s, 0.2s margin 0.8s;
                & > .front {
                    transform: rotateY(180deg);
                    transition: 0.1s transform;
                }
            }
            &.side-6 {
                left: 150%;
                margin-left: -8px;
                transform: rotateY(180deg);
                transform-origin: center right;
                transition: 0.5s transform 0.3s, 0.7s left 0.8s, 0.5s top 0.8s, 0.5s margin 0.8s;
                & > .front {
                    transform: rotateY(180deg);
                    transition: 0.1s transform;
                }
            }
        }
        & ${Footsteps}, & ${ScrollName}, & ${Category}, & ${Octopus} {
            opacity: 1;
            visibility: visible;
            transition: 0.6s opacity 1.2s;
        }
        /*
        & ${Footsteps} {
            &.footsteps-0 ${Foot} {
                animation: 15s ${footsteps0} ease 3s forwards;
            }
            &.footsteps-0 ${ScrollName} {
                animation: 15s ${scroll1} ease 3s forwards;
            }
            &.footsteps-1 ${Foot} {
                animation: 15s ${footsteps1} ease 3.2s forwards;
            }
            &.footsteps-1 ${ScrollName} {
                animation: 15s ${scroll2} ease 3.2s forwards;
            }
        }
        */
    }
    @media (max-width: 800px) { 
        height: ${height*0.75}px;
        width: ${width*0.75}px;
        &.active ${MapSide} {
            &.side-3, &.side-4 {
                top: 8px;
            }
        }
    }
`

