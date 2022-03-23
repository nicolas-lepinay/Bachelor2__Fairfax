import styled from "styled-components";

const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;

export const Container = styled.div`
    background-color: rgb(10, 16, 34);
    background-image: url('${ASSETS}/profile/profile-overview.webp');
    background-size: cover;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
`

export const Header = styled.div`
    height: 90px;
    position: relative;
    width: 100vw;
`

export const Logo = styled.div`
    & > img {
        cursor: pointer;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120px;
        transition: 0.3s ease-in-out;
        &:hover {
            transform: translate(-50%, -50%) scale(1.05);
        }
    }
`

export const Settings = styled.div`
    cursor: pointer;
    float: right;
    height: 30px;
    margin-right: 40px;
	position: relative;
    top: 50%;
    width: 30px;
    transform: translateY(-50%);
    & > img {
        transition: 0.3s ease-in-out;
    }
    & .tooltip {
        color: #fff;
        font-size: 0.65rem;
        font-weight: 100;
        letter-spacing: 1px;
        line-height: 24px;
        opacity: 0;
        padding: 1px 16px;
        position: absolute;
        right: calc(100% + 10px);
        top: 1px;
        visibility: hidden;
        text-transform: uppercase;
        transform: translate(10px);
        white-space: nowrap;
        z-index: 999;
        transition: all 0.3s ease-in-out 0s;
    }
    &:hover {
        & > img {
            transform: scale(1.1);
        }
        & .tooltip {
            opacity: 1;
            visibility: visible;
            transform: translate(0);
        }
    }
`

export const Main = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    /* gap: 6rem; */
    justify-content: space-evenly;
    height: 100%;
`

export const Top = styled.div`
    & > img {
        cursor: pointer;
        width: 90px;
        transition: all 0.3s ease-in-out;
        &:hover {
            transform: scale(1.1);
        }
    }
`

export const Avatar = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    & > img {
        border-radius: 50%;
        height: 250px;
        margin: auto;
        object-fit: cover;
        width: 250px;
    }
    & > .username {
        color: white;
        font-family: 'Bluu Next';
        font-size: 50px;
        position: absolute;
        bottom: -20px;
        text-transform: capitalize;
        text-shadow: 0px 0px 10px black;
    }
    & > button {
        background-color: rgba(107, 99, 181, 1);
        border: none;
        border-radius: 100px;
        color: white;
        cursor: pointer;
        font-size: 0.7rem;
        letter-spacing: 1px;
        left: calc(50% + 2rem);
        padding: 6px 20px;
        position: absolute;
        text-transform: uppercase;
        top: 1rem;
        right: 0;
        width: fit-content;
        transition: all 0.3s ease-in-out;
        &:hover {
            background-color: #5c53a7;
        }
    }
`

export const House = styled.div`
    & > p {
        background-image: radial-gradient(circle, #ded0a0 0%, #a79666 100%);
        background-image: -webkit-radial-gradient(circle, #ded0a0 0%, #a79666 100%);
        background-image: -moz-radial-gradient(circle, #ded0a0 0%, #a79666 100%);
        background-image: -ms-radial-gradient(circle, #ded0a0 0%, #a79666 100%);
        background-image: -o-radial-gradient(circle, #ded0a0 0%, #a79666 100%);
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
        font-family: "Crimson Text", serif;
        font-size: 20px;
        font-weight: 900;
        letter-spacing: 3px;
        text-transform: uppercase;
        text-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
    }
`

export const Bottom = styled.div`
    display: flex;
    gap: 3rem;
    & > img {
        cursor: pointer;
        width: 90px;
        transition: all 0.3s ease-in-out;
        &:hover {
            transform: scale(1.1);
        }
    }
`
