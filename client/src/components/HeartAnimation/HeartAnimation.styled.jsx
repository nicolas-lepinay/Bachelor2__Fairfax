import styled from "styled-components";

const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;

export const Heart = styled.div`
    background-image: url('${ASSETS}/heart-animation.png');
    background-position: 0 0;
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;
    height: 100%;
    width: 100%;
    transition: background-position 1s steps(28);
    transition-duration: 0s;
    &.active {
        transition-duration: 1s;
        background-position: ${props => (props.ratio ? `${props.ratio/100 * -2800}px 0` : `-2800px 0`)};
    }
`