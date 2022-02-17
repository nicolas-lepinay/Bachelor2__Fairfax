import styled from "styled-components";

const colors = {
    grey: 'rgb(72, 85, 106)',
    purple: 'rgb(117, 65, 200)',
    coal: 'rgb(25, 33, 46)',
}

const size = {
    tablet_XL: '960px',
    tablet_L: '830px',
    tablet_M: '730px',
    tablet_S: '630px',
    mobile_XL: '500px',
    mobile_L: '460px',
    mobile_M: '400px'
}

const device = {
    tablet_XL: `(max-width: ${size.tablet_XL})`,
    tablet_L: `(max-width: ${size.tablet_L})`,
    tablet_M: `(max-width: ${size.tablet_M})`,
    tablet_S: `(max-width: ${size.tablet_S})`,
    mobile_XL: `(max-width: ${size.mobile_XL})`,
    mobile_L: `(max-width: ${size.mobile_L})`,
    mobile_M: `(max-width: ${size.mobile_M})`
};

export const Wrapper = styled.div`
    background-color: #f8f8fb;
    display: flex;
    position: relative;
`

export const Container = styled.div`
    background-color: #f8f8fb;
    margin: auto;
    width: min(75%, 900px);
`

export const Grid = styled.div`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-flow: dense;
    grid-auto-rows: auto;
    margin-inline: auto;
    padding-block: 2rem;
    place-content: center;
    text-rendering: optimizeSpeed;
    /* width: min(95%, 1300px); */
    @media ${device.tablet_M} {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`

export const Center = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px 0;
`

export const Button = styled.button`
    background-color: rgba(50, 50, 50, 1);
    border: 0;
    border-radius: 200px;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 2px;
    padding: 15px 30px;
    text-align: center;
    text-decoration: none;
    width: 170px;
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: rgba(40, 40, 40, 1);
    }
`

export const NewPostButton = styled.button`
    align-items: center;
    background-color: crimson;
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: flex;
    font-size: 2rem;
    height: 60px;
    justify-content: center;
    outline: none;
    position: fixed;
    right: 30px;
    top: 90vh;
    width: 60px;
    transition: all 0.5s;
    &:hover {
        background-color: #c01134;

    }
`