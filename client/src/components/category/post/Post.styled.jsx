import styled from "styled-components";

const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;

const colors = {
    grey: 'rgb(72, 85, 106)',
    // purple: 'rgb(117, 65, 200)',
    purple: '#6b63b5',
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

export const Content = styled.p`
    font-size: 0.8rem;
    max-height: 80px;
    opacity: 0.8;
    position: relative;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(180deg, #ffffff 0%, transparent);
`

export const Card = styled.div`
    border-radius: 1rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    cursor: pointer;
    height: 14rem;
    overflow: hidden;
    padding: 2rem 2rem 0 2rem;

    & > *:where(:not(:first-child)) {
        margin-top: var(--flow-spacer, 1em);
    }

    &:nth-child(5n+1) {
        background-image: url('${ASSETS}/bg-pattern-quotation.svg');
        background-repeat: no-repeat;
        background-position: top right 10%;
        background-color: ${colors.purple};
        color: white;
        //grid-column:span 2;   // 1st card needs 2 columns
        grid-column: span 4;     // 1st card needs 4 columns
        @media ${device.tablet_XL} {
            grid-column:span 4;
        }
    }
    &:nth-child(5n+2) {
        background-color: ${colors.grey};
        color: white;
        grid-column: span 2;     // 2nd card needs 2 columns
        @media ${device.tablet_XL} {
            grid-column: span 2;
        }
    }
    &:nth-child(5n+3) {
        background-color: white;
        color: black;
        //grid-column: 1;          // 3rd card at column 1
        grid-column: span 2;       // 3rd card needs 2 columns
        @media ${device.tablet_XL} {
            grid-column: span 2;
        }
    }
    &:nth-child(5n+4) {
        background-color: ${colors.coal};
        color: white;
        //grid-column: span 2;         // 4th card needs 2 columns
        grid-column: span 4;           // 4th card needs 4 columns
        @media ${device.tablet_XL} {
            grid-column: span 4;
        }
    }
    &:nth-child(5n+5) {
        background-color: white;
        color: black;
        grid-area: span 2/4;        // 5th card at column 4 taking 2 rows
        grid-column: span 2;        // 5th card needs 2 columns: ;
        height: 30rem;
        & ${Content} {
            max-height: 300px;
        }
        @media ${device.tablet_XL} {
            grid-column: span 2;
        }
    }
    @media ${device.tablet_M} {
        border-radius: 0;
        padding: 1.5rem;
    }
`

export const FlexBox = styled.div`
    display: flex;
    gap: 1rem;
`

export const Image = styled.img`
    aspect-ratio: 1;
    border-radius: 50%;
    width: 2rem;
`

export const Name = styled.h2`
    font-size: 1rem;
    letter-spacing: 1px;
    line-height: 1;
`

export const Info = styled.p`
    font-size: 0.8rem;
    opacity: 0.7;
`

export const Title = styled.p`
    font-family: 'Bluu Next';
    font-size: 1.3rem;
    letter-spacing: 0.5px;
`

