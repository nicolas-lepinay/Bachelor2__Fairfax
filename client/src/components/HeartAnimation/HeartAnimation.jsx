// 🌌 React :
import { useState } from 'react'

// 💅🏻 Styled components :
import { Heart } from './HeartAnimation.styled';

function HeartAnimation({ ratio, liked }) {

    // const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;
    const [active, setActive] = useState(false);

    return (
        <Heart className={liked ? "active" : ""} ratio={ratio}></Heart>
    )
}

export default HeartAnimation