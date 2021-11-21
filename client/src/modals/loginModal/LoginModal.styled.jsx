import styled from 'styled-components';

const theme = {
    buttonColor: 'rgb(114,105,192)',
    buttonColorDarker: '#5349AD',
    inputColor: 'rgb(248,247,255)',
    mainFontURL: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
    mainFont: '"Poppins", sans-serif',
    titleFontURL: 'https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap" rel="stylesheet',
    titleFont: '"Crimson Text", serif',
    goldColor: 'rgb(172, 155, 108)'
}

export const MATERIAL_STYLE = {
    color: theme.buttonColor,
    left: "20px",
    top: "49%",
    opacity: 0.4,
    position: "absolute",
    transform: "translateY(-50%)"
}

export const ModalWrapper = styled.div`
    @import url(${theme.mainFontURL});
    position: fixed;
    top: 50%;
    left: 50%;
    font-family: ${theme.mainFont};
    opacity: 1;
    transform: translate(-50%, -50%);
    visibility: visible;
    z-index: 1000;
    transition: 0.6s ease-out;
`

export const ModalContainer = styled.div`
    background-color: white;
    border-radius: 15px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    max-width: 90vw;
    min-width: 300px;
    height: 600px;
    position: relative;
    overflow: hidden;
    width: 960px;
`

export const FormWrapper = styled.div`
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 50%;
    transition: all 0.6s ease-in-out;
    &.signin {
        z-index: 2;
    }
    &.signup {
        opacity: 0;
        z-index: 1;
    }
`

export const Form = styled.form`
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
`

export const Title = styled.h1`
    @import url(${theme.titleFontURL});
    font-family: ${theme.titleFont};
    font-size: 2.3rem;
    font-weight: bold;
    margin-bottom: 20px;
`

export const InputAndIcon = styled.div`
    position: relative;
`

export const Input = styled.input`
    background-color: ${theme.inputColor};
    border-color: transparent;
    border: 1px solid rgb(241, 238, 255);
    border-radius: 3px;
    color: rgb(0, 0, 0);
    font-size: 80%;
    margin: 10px 0px;
    min-width: 250px;
    max-width: 40vw;
    outline: none;
    padding: 12px 18px 12px 55px;
    text-shadow: 0 0 3px rgba(255, 255, 255, 0.6);
    &::placeholder {
        color: rgb(59, 59, 59);
        font-size: 85%;
        opacity: 0.5;
        text-transform: uppercase;
    }
`

export const Info = styled.div`
    font-size: 80%;
    text-shadow: 0 0 2px rgba(255, 255, 255, 0.5);
    margin-top: 20px;
    margin-bottom: 40px;
`

export const Requirements = styled.div`
    position: relative;
    margin-left: 0px;
`

export const Text = styled.span`
    float: left;
    padding-left: 30px;
`

export const Button = styled.button`
    background-color: ${theme.buttonColor};
    border: 1px solid ${theme.buttonColor};
    border-radius: 50px;
    color: white;
    cursor: pointer;
    font-size: 12px;
    padding: 12px 45px;
    letter-spacing: 2px;
    text-transform: uppercase;
    outline: none;
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: ${theme.buttonColorDarker};
    }
    &.ghost {
        background-color: transparent;
        border: 1px solid white;
        font-weight: 600;
        transition: all 0.3s ease-in-out;
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
`

export const OverlayContainer = styled.div`
    height: 100%;
    left: 50%;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 50%;
    z-index: 100;
    transition: transform 0.6s ease-in-out;
`

export const Overlay = styled.div`
    color: white;
    height: 100%;
    left: -100%;
    position: relative;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;

    background: ${theme.goldColor};
    background: radial-gradient(circle,rgba(222, 208,160,1) 0%,rgba(167,150,102,1) 100%);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
`

export const Panel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    &.left {
        transform: translateX(-20%);
    }
    &.right {
        right: 0;
        transform: translateX(0);
    }
`