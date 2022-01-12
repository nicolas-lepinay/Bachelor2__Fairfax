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
    align-items: center;
    cursor: pointer;
    display: flex;
    margin-top: 20px;
    padding: 10px;
    &:hover {
        background-color: rgb(250, 250, 250);
    }
`

export const Image = styled.img`
    border-radius: 50%;
    height: 40px;
    margin-right: 20px;
    object-fit: cover;
    width: 40px;
`

export const Name = styled.span`
    font-weight: 500;
`