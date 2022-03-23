import styled, { keyframes } from 'styled-components';

export const MATERIAL_STYLE = {
    color: "white",
    left: "20px",
    top: "50%",
    opacity: "0.15",
    position: "absolute",
    transform: "translateY(-50%)"
};

export const shake = keyframes`
    10%, 90% {
      transform: translate3d(-4px, 0, 0);
    }
    20%, 80% {
      transform: translate3d(8px, 0, 0);
    }
    30%, 50%, 70% {
      transform: translate3d(-16px, 0, 0);
    }
    40%, 60% {
      transform: translate3d(16px, 0, 0);
    }
`

export const Container = styled.div`
    background: #232323;
    color: white;
    display: flex;
    height: 100vh;
    overflow-y: auto;
    position: relative;
    width: 100vw;
    // Invisible scrollbar :
    -ms-overflow-style: none;   // Edge
    scrollbar-width: none;      // Firefox
    &::-webkit-scrollbar {      // Chrome, Safari
        display: none;
    }
    & svg {
        cursor: pointer;
        position: absolute;
        top: 2rem;
        right: 3.5rem;
    }
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: auto;
    max-width: 320px;
    padding: 3.5rem 0;
    width: 90%;
`

export const Heading = styled.h1`
    font-family: 'Bluu Next', serif;
    font-size: 35px;
    font-weight: 100;
    letter-spacing: 3px;
    margin: 0 auto;
	text-shadow: 0 0 3px rgba(255, 255, 255, 0.8);
`

export const Ornament = styled.div`
    align-items: center;
    display: flex;
    gap: 0.6rem;
    margin: 0.5rem auto;
    opacity: 0.3;
    & > .line {
        height: 1px;
	    width: 150px;
        &.left {
            background: linear-gradient(90deg, transparent 0%, #fff 100%);
        }
        &.right {
            background: linear-gradient(90deg, white 0%, transparent 100%);
        }
    }
    & > .diamond {
        background: white;
        height: 7px;
        transform: rotate(45deg);
        width: 7px;
    }
`

export const Subheading = styled.h4`
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 2px;
    text-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const Avatar = styled.label`
    margin: 0 auto 1rem auto;
    & ~ input[type="file"] {
        display: none;
    }
    & > img {
        border-radius: 50%;
        cursor: pointer;
        height: 150px;
        object-fit: cover;
        width: 150px;
        transition: all 0.3s ease-in-out;
        &:hover {
            transform: scale(1.05);
        }
    }
`

export const InputWrapper = styled.div`
    margin: -5px 0 1.2rem 0;
    position: relative;
`

export const Input = styled.input`
    background-color: #2d2d2d;
    border: 1px solid rgba(66, 66, 66, 1);
    border-radius: 3px;
    color: white;
    font-size: 0.8rem;
    outline: none;
    padding: 1rem 1.5rem 1rem 3.5rem;
    text-shadow: 0 0 3px rgba(255, 255, 255, 0.6);
    width: 100%;
    &.error {
        border: 1px solid rgba(255, 0, 0, 0.6);
        box-shadow: 0 0 8px rgba(255, 0, 0, 0.4);
    }
`

export const Button = styled.button`
    background: #6b63b5; ;
    border: none;
    border-radius: 100px;
    color: white;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 2px;
    outline: none;
    padding: 14px 10px;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    margin: 1rem 0;
    width: 100%;
    &:hover {
        background: #5950a8; 
    }
    &:disabled {
        pointer-events: none;
        opacity: 0.5;
    }
`

export const ErrorMessage = styled.p`
    color: crimson;
    font-size: 0.9rem;
    margin: -1.3rem auto 1.3rem auto;
    text-shadow: 0 0 8px rgba(255, 0, 0, 0.6);
    text-align: center;
`
