import styled from "styled-components";

const colors = {
    grey: 'rgb(72, 85, 106)',
    purple: 'rgb(117, 65, 200)',
    coal: 'rgb(25, 33, 46)',
}

export const MATERIAL_STYLE = {
    FULLSCREEN: {
        position: 'absolute',
        top: '49%',
        left: '51%',
        transform: 'translate(-50%, -50%)',
    },
    REPLY: {
        position: 'absolute',
        top: '49%',
        left: '10px',
        transform: 'translateY(-50%)',
    }
}

export const Container = styled.div`
    background-color: rgb(50, 50, 50);
    border-radius: 30px;
    box-shadow: 0 0 40px 0 rgba(94, 92, 154, 0.3);
    color: white;
    cursor: default;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: clamp(930px, 100vh, 150vh);
    /* max-height: 150vh;
    min-height: 100vh; */
    padding: 4rem 5rem;
    width: 100%;
`

export const Title = styled.h1`
    font-family: 'Bluu Next';
    /* -moz-font-family: 'Crimson Text', serif; */
    font-size: 2.3rem;
`

export const Author = styled.div`
    align-items: center;
    display: flex;
    gap: 1rem;
    & .avatar {
        border-radius: 50%;
        height: 50px;
        object-fit: cover;
        width: 50px;
        transition: all 0.2s ease-in-out;
        &:hover {
            transform: scale(1.1);
        }
    }
    & h4 {
        letter-spacing: 1px;
    }
`

export const Content = styled.div`
    font-size: 0.9rem;
    min-height: 450px;
    line-height: 1.8;
    overflow: auto;
    margin-right: -4rem;
    padding-right: 4rem;
    -webkit-mask-image: linear-gradient(180deg, #ffffff 60%, transparent);
    -ms-overflow-style: none;   // Edge
    scrollbar-width: none;      // Firefox
    &::-webkit-scrollbar {      // Chrome, Safari
        display: none;
    }
    &.at-bottom {
        -webkit-mask-image: linear-gradient(360deg, #ffffff 60%, transparent);
    }
`

export const Interactions = styled.div`
    align-items: center;
    display: flex;
    gap: 1rem;
    margin: 1rem 0 2rem 0;
    & p {
        display: inline-block;
        font-size: 0.9rem;
        float: right;
    }
`

export const Information = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    & > div {
        & > h4 {
            font-size: 0.9rem;
            font-weight: 500;
            letter-spacing: 1px;
            opacity: 0.7;
            text-transform: uppercase;
        }
        & > p {
            font-size: 0.9rem;
            font-weight: 500;
            letter-spacing: 1px;
        }   
    }

`

export const Button = styled.button`
    align-items:center;
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 200px;
    color: white;
    cursor: pointer;
    display: flex;
    gap: 0.4rem;
    min-width: 50px;
    outline: none;
    padding: 8px 20px;
    position: relative;
    transition: all 0.2s ease-in-out;
    &.purple {
        background-color: #6c62c5;
        &:hover {
            background-color: #7d70f1; 
        }
    }
    &:hover {
        background-color: black;
    }
`

export const HeartContainer = styled.div`
    align-items:center;
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 200px;
    color: white;
    cursor: pointer;
    display: flex;
    font-size: 0.9rem;
    outline: none;
    padding: 8px 60px 8px 20px;
    position: relative;
    transition: all 0.2s ease-in-out;
`

export const HeartWrapper = styled.div`
    bottom: -57%;
    position: absolute;
    right: -9px;
`