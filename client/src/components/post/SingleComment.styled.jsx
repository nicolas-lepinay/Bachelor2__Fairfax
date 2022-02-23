import styled from "styled-components";

// Draft Text Editor :
export const wrapperStyle = {
    backgroundColor: 'rgb(252, 253, 255)',
    border: '2px solid rgba(0, 0, 0, 0.03)',
    padding: '1rem 1.5rem',
    margin: '0'
}

export const editorStyle = {
    backgroundColor:'rgba(255, 255, 255, 0.3)',
    // border: '1px solid rgb(245, 245, 245)',
    fontSize: '15px',
    padding: '0.5rem 1rem 3rem 1rem',
}

export const toolbarStyle = {
    backgroundColor:'transparent',
    border: '1px solid rgb(255, 255, 255)',
    marginBottom: '10px',
}

export const toolbarOptions = {
    options: ['inline', 'list', 'fontSize', 'link', 'emoji', 'image', 'remove', 'history'], 
    inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
      },
    fontSize: { options: [12, 15, 18] },
}

export const MATERIAL_STYLE = {
    ARROW_UP: {
        transform: 'rotate(180deg)',
        transition: 'all 0.5s'
    },
    ARROW_DOWN: {
        transform: 'rotate(360deg)',
        transition: 'all 0.5s'
    }
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0px;
    height: auto;
`

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

export const Content = styled.p`
    cursor: default;
    font-size: 0.85rem;
    line-height: 1.8;
    overflow: auto;
    /* text-align: justify; */
`

export const Interactions = styled.div`
    display: inline-block;
    margin-bottom: 10px;
    padding-left: 1rem;
    vertical-align: middle;
`

export const DropdownTitle = styled.div`
    cursor: pointer;
    display: flex;
    float: left;
    gap: 1rem;
    & span {
        font-weight: 600;
        letter-spacing: 1px;
    }
`

export const Actions = styled.div`
    display: flex;
    float: right;
    gap: 2rem;
`

export const Button = styled.button`
    align-items:center;
    background-color: transparent;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 200px;
    color: black;
    cursor: pointer;
    display: flex;
    font-size: 0.8rem;
    gap: 0.4rem;
    min-width: 50px;
    outline: none;
    padding: 5px 20px;
    position: relative;
`

export const Replies = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 0;
    overflow: hidden;
    /* padding-left: 1rem; */
    transition: all 1s cubic-bezier(0, 1, 0, 1);
    &.show {
        max-height: 9999px;
        transition: all 1s cubic-bezier(1, 0, 1, 0);
    }
`

export const Single = styled.div`
    background-color: rgb(250, 251, 255);
    border: 2px solid rgba(0, 0, 0, 0.03);
    padding: 1rem 1.5rem;
    & ${Author} {
        align-items: flex-start;
    }
    & .body {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: -1.5rem;
        padding-left: 4.5rem;
        & p {
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
                color: crimson;
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
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 200px;
    color: black;
    cursor: pointer;
    display: flex;
    font-size: 0.8rem;
    outline: none;
    padding: 5px 48px 5px 20px;
    position: relative;
`

export const HeartWrapper = styled.div`
    bottom: -47%;
    position: absolute;
    right: -6px;
`