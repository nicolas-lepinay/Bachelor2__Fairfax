import styled from "styled-components";

const colors = {
    grey: 'rgb(72, 85, 106)',
    purple: 'rgb(117, 65, 200)',
    coal: 'rgb(25, 33, 46)',
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

export const Wrapper = styled.div`
    background-color: #f8f8fb;
    display: flex;
    min-height: 150vh;
    position: relative;
`
export const Container = styled.div`
    /* background-color: #f8f8fb; */
    overflow-x: hidden;
    width: 100%;
`

export const Banner = styled.div`
    height: 800px;
    position: relative;
    width: 100%;
`

export const Image = styled.img`
    height: 100%;
    object-fit: cover;
    width: 100%;
`

export const Bottom = styled.img`
    bottom: -2px;
    left: 50%;
    min-width: 1900px;
    position: absolute;
    transform: translateX(-50%);
    width: 100%;
    filter: brightness(0) saturate(100%) invert(93%) sepia(3%) saturate(112%) hue-rotate(200deg) brightness(105%) contrast(98%);
`

export const Overlay = styled.img`
    left: 50%;
    min-width: 1900px;
    opacity: 0.8;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    width: 100%;
`

export const Title = styled.h1`
    color: white;
    font-family: 'Tangerine', cursive;
    font-size: 11rem;
    /* left: 50%; */
    letter-spacing: 5px;
    padding: 0 5rem;
    position: absolute;
    text-align: center;
    text-shadow: 0 0 20px black;
    top: 25%;
    /* transform: translateX(-50%); */
    -webkit-text-stroke: 2px white;
    width: 100%;
    z-index: 1;
`

export const Logo = styled.img`
    left: 50%;
    min-width: 500px;
    position: absolute;
    top: 17%;
    transform: translateX(-50%);
    width: 40%;
    z-index: 1;
`

export const MainContent = styled.div`
    background-color: #f8f8fb;
    margin: 100px auto;
    width: min(75%, 900px);
`

export const Grid = styled.div`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-flow: dense;
    grid-auto-rows: auto;
    margin-inline: auto;
    padding-block: 2rem;
    place-content: center;
    text-rendering: optimizeSpeed;
    /* width: min(95%, 1300px); */
    @media ${device.tablet_M} {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`

export const Center = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px 0;
`

export const Button = styled.button`
    background-color: rgba(50, 50, 50, 1);
    border: 0;
    border-radius: 200px;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 2px;
    margin: 2rem auto;
    padding: 15px 30px;
    text-align: center;
    text-decoration: none;
    width: 170px;
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: rgba(40, 40, 40, 1);
    }
`

export const NewPostButton = styled.button`
    align-items: center;
    background-color: #ef4b6c;
    box-shadow: 10px 16px 40px 0 rgba(255,84,117,.46);
    bottom: 30px;
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: flex;
    font-size: 2rem;
    height: 60px;
    justify-content: center;
    position: fixed;
    outline: none;
    right: 30px;
    width: 60px;
    z-index: 10;
    transition: all 0.5s;
    &:hover {
        background-color: #df4664;
    }
`