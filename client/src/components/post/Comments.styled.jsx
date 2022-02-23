import styled from "styled-components";

// Draft Text Editor :
export const wrapperStyle = {
    margin: '1.5rem 0'
}

export const editorStyle = {
    backgroundColor:'rgb(255, 255, 255)',
    border: '1px solid rgb(245, 245, 245)',
    fontSize: '15px',
    padding: '0.5rem 1rem 4rem 1rem',
}

export const toolbarStyle = {
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

export const Container = styled.div`
    background-color: white;
    border-radius: 30px;
    color: black;
    padding: 50px;
    width: 100%;
    overflow: auto;
    height: clamp(930px, 100vh, 150vh);
    /* scrollbar-color: rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0); */
    -ms-overflow-style: none;   // Edge
    scrollbar-width: none;      // Firefox
    &::-webkit-scrollbar {      // Chrome, Safari
        display: none;
    }
    -webkit-mask-image: linear-gradient(180deg, #ffffff 80%, transparent);

    &.at-bottom {
        -webkit-mask-image: linear-gradient(360deg, #ffffff 70%, transparent);
    }
`

export const NoComment = styled.div`
    color: black;
    font-size: 1.5rem;
    letter-spacing: 1px;
    opacity: 0.5;
`
