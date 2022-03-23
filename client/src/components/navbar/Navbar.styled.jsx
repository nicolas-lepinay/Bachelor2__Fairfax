import styled from "styled-components";

export const MATERIAL_STYLE = {
    position: "absolute",
    top: "0",
    width: "1rem",
}

export const Nav = styled.div`
    background-color: white;
    box-shadow: 0 0 40px 0 rgba(94, 92, 154, 0.1);
    /* height: calc(100vh - 70px); */
    height: 100vh;
    padding: 20px 10px 20px 15px;
    position: sticky;
    /* top: 70px; */
    top: 0px;
    width: 90px;
    max-width: 200px;
    z-index: 100;
    /* transition: all 0.5s ease-in-out; */
    transition: 0.8s max-width ease-in-out, 0.8s padding ease-in-out, overflow 0.8s ease-in-out, opacity 0.8s ease-in-out;
    &.hidden {
        max-width: 0px;
        padding: 0;
        opacity: 0;
        overflow: hidden;
    }
`

export const List = styled.ul`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    list-style: none;
    max-height: 100%;
    & > .link {
        color: inherit;
        text-decoration: none;
    }
`

export const SVG = styled.img`
    filter: invert(69%) sepia(9%) saturate(572%) hue-rotate(198deg) brightness(102%) contrast(88%);
    object-fit: cover;
    width: 50%;
    transition: all 0.3s ease-in-out 0s;
`

export const Item = styled.li`
    align-items: center;
    background-color: white;
	border-radius: 12px;
    cursor: pointer;
	display: flex;
	font-size: 0.875rem;
	font-weight: 700;
	height: 48px;
    justify-content: center;
	line-height: 48px;
	position: relative;
    width: 48px;
	transition: all .3s ease-in-out;
    & .tooltip {
        background-color: #3e3f5e;
        border-radius: 200px;
        color: #fff;
        font-size: 0.65rem;
        font-weight: 100;
        letter-spacing: 1px;
        line-height: 24px;
        opacity: 0;
        position: absolute;
        left: calc(100% + 10px);
        top: 25%;
        visibility: hidden;
        text-transform: uppercase;
        transform: translate(10px);
        white-space: nowrap;
        z-index: 999;
        transition: all 0.3s ease-in-out 0s;
        padding: 1px 16px;
        & > .ml-25 {
            margin-left: 25px;
        }
    }
    & .notifications {
        background: white;
        border: 3px solid rgb(240, 240, 240);
        border-radius: 20px;
        box-shadow: 0 0 40px 0 rgba(94, 92, 154, 0.1);
        color: black;
        cursor: default;
        display: flex;
        flex-direction: column;
        left: 50px;
        padding: 20px;
        position: absolute;
        top: 20px;
        width: 500px;
        z-index: 1000;
        & .single-notification {
            border-bottom: 1px solid rgb(200, 200, 200);
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            padding: 5px;
            transition: all 0.3s ease-in-out;
            &:hover {
                color: #6b63b5;
            }
        }
    }
    &:hover {
        /* box-shadow: 0 0 20px 0 rgba(94, 92, 154, 0.15); */
        & ${SVG} {
            /* filter: invert(39%) sepia(91%) saturate(300%) hue-rotate(206deg) brightness(90%) contrast(96%); */
            filter: invert(47%) sepia(58%) saturate(7080%) hue-rotate(231deg) brightness(102%) contrast(96%);
            transform: scale(1.05);
            transition: all .2s ease-in-out;
        }
        & .tooltip {
            opacity: 1;
            visibility: visible;
            transform: translate(0);
        }
    }
    &.no-shadow:hover {
        box-shadow: none;
    }
`

export const Avatar = styled.img`
    border-radius: 50%;
    height: 35px;
    object-fit: cover !important;
    width: 35px;
`

export const Logo = styled.img`
    object-fit: cover !important;
    width: 35px;
`

export const HR = styled.hr`
    color: black;
    opacity: 0.2;
    margin-bottom: 10px;
    width: 45px;
`

export const Alert = styled.span`
    align-items: center;
    background-color: red;
    border-radius: 50%;
    color: white;
    display: flex;
    font-size: 12px;
    height: 5px;
    justify-content: center;
    position: absolute;
    top: 4px;
    right: 4px;
    width: 5px;
`