import styled from "styled-components";

export const Navigation = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translate(-50%);
`

export const Label = styled.label`
    border: 2px solid white;
    border-radius: 30px;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
    cursor: pointer;
    height: 15px;
    margin: 5px 15px 5px 0;
    width: 15px;
    &:hover {
        border: 3px solid white;
    }
`

export const Slidershow = styled.div`
    height: 100vh;
    overflow: hidden;
    width: 100%;
`

export const Slides = styled.div`
    display: flex;
    flex-direction: column;
    height: 300vh;
    width: 100vw;
    & > #r1:checked ~ .slide-1 {
        margin-top: 0;
    }
    & > #r2:checked ~ .slide-1 {
        margin-top: -100vh;
    }
    & > #r3:checked ~ .slide-1 {
        margin-top: -200vh;
    }
`

export const InputRadio = styled.input`
    &[name=r] {
        position: absolute;
        visibility: hidden;
    }
    &#r1:checked ~ ${Navigation} > #bar1,
    &#r2:checked ~ ${Navigation} > #bar2,
    &#r3:checked ~ ${Navigation} > #bar3 {
        background: white;
    }
    &#r1:checked ~ .slide-1 {
        margin-top: 0;
    }
    &#r2:checked ~ .slide-1 {
        margin-top: -100vh;
    }
    &#r3:checked ~ .slide-1 {
        margin-top: -200vh;
    }
`

export const Slide = styled.div`
    position: relative;
    height: calc(100% * (1/3));
    transition: 0.8s;
`

// #r1:checked ~ .navigation #bar1