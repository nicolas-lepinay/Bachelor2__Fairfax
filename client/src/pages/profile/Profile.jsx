// 🌌 React :
import { useState, useEffect } from "react";
import { useParams } from "react-router";

// 🚧 React Component :
import NavbarNude from '../../components/navbar/NavbarNude.jsx';
import ProfileOverview from '../../components/profile/ProfileOverview';
import ProfileActivity from '../../components/profile/ProfileActivity';

// 💅🏻 Styled Components :
import { Slidershow, Slides, InputRadio, Slide, Navigation, Label } from './Profile.styled';

// 🅰️ Axios :
import axios from "axios";

function Profile() {
    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    const [profileUser, setProfileUser] = useState({});
    const slug = useParams().slug.toLowerCase();

    useEffect ( () => {
        const fetchProfileUser = async () => {
            const res = await axios.get(`/users?slug=${slug}`);
            setProfileUser(res.data);
        }
        fetchProfileUser();
    }, [slug]);

  return (
    <>
        <NavbarNude/>
        <Slidershow>
            <Slides>
                <InputRadio type="radio" name="r" id="r1" checked />
                <InputRadio type="radio" name="r" id="r2" />

                <Slide className="slide-1">
                    <ProfileOverview profileUser={profileUser} />
                </Slide>

                <Slides className="slide-2">
                    <ProfileActivity profileUser={profileUser} />
                </Slides>

                <Navigation>
                    <Label htmlFor="r1" className="bar" id="bar1"></Label>
                    <Label htmlFor="r2" className="bar" id="bar2"></Label>
                </Navigation>
            </Slides>
        </Slidershow>
    </>
  )
}

export default Profile