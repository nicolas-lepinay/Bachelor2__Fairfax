import styled from 'styled-components';

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
        primaryColor: 'rgb(114,105,192)',
        secondaryColor: 'rgb(235,235,235)'
    },
    font: {
        primaryColor: 'black',
        secondaryColor: 'white'
    }
}

export const Top = styled.div`
    display: flex;
`

export const Bottom = styled.div`
    font-size: 0.8rem;
    margin-top: 10px;
`

export const Image = styled.img`
    border-radius: 50%;
    height: 32px;
    margin-right: 10px;
    object-fit: cover;
    width: 32px;
`

export const Text = styled.p`
    background-color: ${theme.messages.primaryColor};
    border-radius: 20px;
    color: ${theme.font.secondaryColor};
    font-size: 0.9rem;
    padding: 10px;
    max-width: 400px;
    &.own {
        align-items: flex-end;
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    &.own {
        align-items: flex-end;
    }
    &.own ${Text} {
        background-color: ${theme.messages.secondaryColor};
        color: ${theme.font.primaryColor};
    }
`
