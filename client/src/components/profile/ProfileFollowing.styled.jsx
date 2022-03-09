import styled from "styled-components";

const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;

export const Container = styled.div`
    background-color: rgb(10, 16, 34);
    background-image: url('${ASSETS}/profile/profile-following.webp');
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
    padding-bottom: 70px;
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

export const Wrapper = styled.div`
    margin: auto;
    overflow-y: auto;
    padding-top: 1rem;
    padding-bottom: 40vh; // 50vh to be able to scroll all the way down
    width: 100%;
    // Clipping mask :
    -webkit-mask-image: linear-gradient(180deg, #ffffff 40%, transparent);
    // Invisible scrollbar :
    -ms-overflow-style: none;   // Edge
    scrollbar-width: none;      // Firefox
    &::-webkit-scrollbar {      // Chrome, Safari
        display: none;
    }
`

export const FriendList = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
`

export const Friend = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
    &:hover > .username {
        text-shadow: 0px 0px 8px rgba(255, 255, 255, 1);
    }
    & > img {
        border-radius: 50%;
        width: 120px;
        margin: auto;
    }
    & > .username {
        color: white;
        font-family: 'Bluu Next';
        font-size: 26px;
        position: absolute;
        bottom: -12px;
        text-transform: capitalize;
        text-shadow: 0px 0px 10px black;
        transition: all 0.4s ease-in-out;
    }
`

export const NoFriend = styled.h1`
    color: white;
    font-family: 'Bluu Next';
    font-size: 2.2rem;
    left: 50%;
    letter-spacing: 1px;
    margin: auto;
    position: absolute;
    text-align: center;
    text-shadow: 0px 0px 10px black;
    top: 50%;
    transform: translate(-50%, -50%);
`
