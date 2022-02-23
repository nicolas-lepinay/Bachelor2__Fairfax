import styled from "styled-components";

export const Author = styled.div`
    align-items: center;
    cursor: default;
    display: flex;
    gap: 1.5rem;
    & .avatar {
        border-radius: 50%;
        cursor: pointer;
        height: 50px;
        object-fit: cover;
        width: 50px;
        transition: all 0.2s ease-in-out;
        &:hover {
            transform: scale(1.1);
        }
    }
    & .date {
        font-size: 0.75rem;
        opacity: 0.5;
    }
    & h4 {
        letter-spacing: 1px;
    }
`

export const Single = styled.div`
    background-color: rgb(252, 254, 255);
    border: 2px solid rgba(0, 0, 0, 0.03);
    border-radius: 10px;
    padding: 1rem 1.5rem;
    & ${Author} {
        align-items: flex-start;
    }
    & .body {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: -1.5rem;
        padding-left: 4.5rem;
        & .content {
            font-size: 0.85rem;
            /* text-align: justify; */
        }
        & .flexbox {
            align-items: center;
            display: flex;
            gap: 1.5rem;
            & .date {
                font-size: 0.75rem;
                opacity: 0.5;
            }
            & button {
                align-items: center;
                background-color: transparent;
                border: none;
                border: 1px solid green;
                color: crimson;
                cursor: pointer;
                display: flex;
                gap: 0.4rem;
                outline: none;
            }
        }
    }
    &:last-child {
        margin-bottom: 2rem;
    }
`

export const HeartContainer = styled.div`
    align-items: center;
    background-color: transparent;
    border: none;
    color: rgba(90, 90, 90, 1);
    cursor: pointer;
    display: flex;
    font-size: 0.8rem;
    outline: none;
    padding: 3px 40px 3px 0px;
    position: relative;
    &.liked {
        color: crimson;
    }
`

export const HeartWrapper = styled.div`
    bottom: -77%;
    position: absolute;
    right: -11px;
`