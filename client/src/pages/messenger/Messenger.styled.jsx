import styled from 'styled-components';

const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;

const theme = {
    buttonColor: 'rgb(114,105,192)',
    buttonColorDarker: '#5349AD',
    inputColor: 'rgba(255, 253, 248, 0.3)',
    mainFontURL: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
    mainFont: '"Poppins", sans-serif',
    titleFontURL: 'https://fonts.googleapis.com/css2?family=Average&display=swap',
    titleFont: '"Average", serif',
    gold : {
        color: 'rgb(172, 155, 108)',
        gradient: `radial-gradient(circle,rgba(222, 208,160,1) 0%,rgba(167,150,102,1) 100%)`
    },
    messages: {
        // code
    }
}

export const Container = styled.div`
    display: flex;
    height: 100vh;
    margin: auto;
    width: 90%;
    max-width: 1400px;
`

export const Wrapper = styled.div`
    height: 100%;
    padding: 10px;
    &.box__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
    }
`

export const Menu = styled.div`
    flex: 3;
`

export const Box = styled.div`
    flex: 6.5;
`

export const Online = styled.div`
    flex: 2.5;
`

export const Searchbar = styled.input`
    background-color: transparent;
    border: none;
    border-bottom: 1px solid grey;
    padding: 10px 0;
    width: 90%;
    &:focus {
        outline: none;
    }
`

export const BoxTop = styled.div`
    height: 100%;
    overflow-y: scroll;
    padding-right: 40px;
`

export const BoxBottom = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
`

export const TextArea = styled.textarea`
    height: 90px;
    padding: 10px;
    width: 80%;
`

export const Button = styled.button`
    background-color: ${theme.buttonColorDarker};
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    height: 40px;
    width: 70px;
`

export const NoChat = styled.span`
    cursor: default;
    font-size: 1.3rem;
    position: absolute;
    left: 50%;;
    opacity: 0.5;
    top: 10%;
    text-align: center;
    transform: translateX(-50%);
`