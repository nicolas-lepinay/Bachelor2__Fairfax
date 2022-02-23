import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: #f8f8fb;
    display: flex;
    flex-wrap: wrap;
`

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2.5rem;
    margin: 80px auto;
    width: min(80%);
    transition: 0.7s all ease-in-out;
    &.full-width {
        flex-wrap: wrap;
        width: min(60%);
    }
    @media (max-width: 1300px) {
        flex-wrap: wrap;
        width: min(60%);
    }
`