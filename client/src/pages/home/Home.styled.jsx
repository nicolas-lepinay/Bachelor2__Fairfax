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
    margin: 100px auto 150px auto;
    min-width: 400px;
    width: 50%;
    text-align: center;
    & h1 {
        font-family: 'Bluu Next', serif;
        font-size: 3.9rem;
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
        font-size: 1.4rem;
        font-weight: 200;
    }
`

export const Trivia = styled.div`
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    margin-bottom: 200px;
    padding-left: 160px;
    width: 100%;
    & .text {
        margin-right: -70px;
        & h1 {
            background-image: radial-gradient(circle, #ded0a0 0%, #a79666 100%);
            background-clip: text;
            color: transparent;
            font-family: 'Bluu Next', serif;
            font-size: 3.9rem;
            font-weight: 200;
            margin-bottom: 30px;
        }
        & p {
            font-family: 'Crimson Text', serif;
            font-size: 1.4rem;
            font-weight: 200;
        }
    }
    & img {
        height: 900px;
        transform: translateX(220px);
    }
    @media (max-width: 1200px) {
        padding-left: 100px;
        & .text {
            margin-right: -180px;
            & h1 {
                font-size: 3rem;
            }
            & p {
                font-size: 1.2rem;
            }
        }
        & img {
            height: 700px;
        };
    }
    @media (max-width: 800px) {
        align-items: center;
        gap: 4rem;
        flex-direction: column-reverse;
        padding: 0 50px;
        & img {
            height: 500px;
            transform: translateX(0);
        };
        & .text {
            margin: 0;
        }
    }
`
