import styled from "styled-components";

export const Container = styled.div`
    border-radius: 20px;
    margin: 0 auto;
    max-width: 760px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 50vh; // To be able to scroll all the way down
    width: 100%;
    // Clipping mask :
    -webkit-mask-image: linear-gradient(180deg, #ffffff 60%, transparent);
    // Invisible scrollbar :
    -ms-overflow-style: none;   // Edge
    scrollbar-width: none;      // Firefox
    &::-webkit-scrollbar {      // Chrome, Safari
        display: none;
    }
`

export const HR = styled.hr`
    /* box-shadow: 0px 0px 8px rgba(255, 255, 255, 1); */
    color: white;
    margin: 1rem auto;
    opacity: 0.1;
    width: 80%;
`

export const Single = styled.div`
    /* background-color: rgba(40, 40, 40, 1); */
    /* border-left: 1px solid white; */
    /* border-top: 1px solid white; */
    /* border-right: 1px solid white; */
    color: white;
    height: 130px;
    padding: 1rem 3rem 1rem 1rem;
    width: 100%;
    /* &:last-child {
        border-bottom: 1px solid white;
    } */
`

export const Avatar = styled.img`
    border-radius: 50%;
    height: 40px;
    object-fit: cover;
    width: 40px;
`

export const Row = styled.div`
    display: flex;
    gap: 1rem;
    height: 100%;
`

export const Columns = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
`

export const PostTitle = styled.p`
    cursor: pointer;
    font-family: 'Bluu Next', serif;
    font-size: 1.2rem;
    letter-spacing: 0.5px;
    transition: all 0.2s ease-in-out;
    &:hover {
        color: #a096f5;
    }
`

export const PostContent = styled.p`
    font-size: 0.7rem;
    max-height: 40px;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(180deg, #ffffff 0%, transparent);
`

export const Inline = styled.div`
    align-items: center;
    color: rgba(170, 170, 170, 1);
    font-size: 0.8rem;
    display: flex;
    gap: 0.7rem;
    & .link {
        cursor: pointer;
        font-family: 'Bluu Next', serif;
        letter-spacing: 1px;
        transition: all 0.2s ease-in-out;
        &:hover {
            color: #a096f5;
        }
    }
    & .separator {
        font-size: 0.8rem;
    }
`