import styled from "styled-components";

const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;

export const Container = styled.div`
    background-image: url('${ASSETS}/profile/profile-activity.webp');
    background-size: cover;
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 40px 90px 30px 100px;
    width: 100vw;
`

export const Header = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding-bottom: 50px;
    & >  button {
        background-color: rgba(107, 99, 181, 1);
        border: none;
        border-radius: 100px;
        color: white;
        cursor: pointer;
        font-size: 0.9rem;
        letter-spacing: 2px;
        margin: 0 auto;
        min-width: 200px;
        outline: none;
        padding: 0.7rem 3rem;
        text-transform: uppercase;
        text-align: center;
        transition: all 0.2s ease-in-out;
        &.active {
            opacity: 1;
            text-shadow: 0px 0px 8px rgba(255, 255, 255, 1);
        }
        &:not(.active):hover {
            background-color: #544ba3;
        }
    }
    @media (max-width: 700px) { 
        flex-direction: column;
        gap: 0.5rem;
        & > button {
            font-size: 0.7rem;
            letter-spacing: 1px;
            min-width: 180px;
            padding: 0.5rem 3rem;
        }
    }
`

