import styled from 'styled-components';


export const Wrapper = styled.div`
    background-color: #f8f8fb;
    display: flex;
    min-height: 100vh;
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

export const Background = styled.div`
    background-image: linear-gradient(to top right,#450b7c,#563cc9,#49e9fb);
    height: 100%;
    width: 100%;
`

export const Overlay = styled.img`
    left: 50%;
    min-width: 1900px;
    opacity: 0.4;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    width: 100%;
`

export const Logo = styled.img`
    left: 50%;
    min-width: 500px;
    position: absolute;
    top: 15%;
    transform: translateX(-50%);
    width: 40%;
    z-index: 1;
`

export const Introduction = styled.div`
    margin: 100px auto 300px auto;
    min-width: 400px;
    width: 50%;
    text-align: center;
    & h1 {
        font-family: 'Crimson Text', serif;
        font-size: 4rem;
        font-weight: 200;
    }
    & h4 {
        font-family: 'Crimson Text', serif;
        font-size: 2rem;
        font-weight: 200;
    }
    & hr {
        background-color: rgba(167, 150, 102, 1);
        border: none;
        height: 4px;
        margin: 20px auto 50px auto;
        width: 60px;
    }
    & p {
        /* font-family: 'Poppins', sans-serif;
        font-size: 1rem; */
        font-family: 'Crimson Text', serif;
        font-size: 1.1rem;
        font-weight: 200;
    }
`
