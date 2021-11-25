import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Layout = styled(props => <motion.div {...props} />)`
    background: transparent;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
`

function Backdrop( { children, onClick }) {
    return (
        <Layout 
            onClick={onClick}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            { children }
        </Layout>
    )
}

export default Backdrop
