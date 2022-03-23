// 🌌 React :
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

// 🚧 React Component :
import NavbarNude from '../../components/navbar/NavbarNude.jsx';
import ProfileOverview from '../../components/profile/ProfileOverview';
import ProfileActivity from '../../components/profile/ProfileActivity';
import ProfileFollowing from '../../components/profile/ProfileFollowing';

// 💅🏻 Styled Components :
import { Slidershow, Slides, InputRadio, Slide, Navigation, Label } from './Profile.styled';

// 🅰️ Axios :
import axios from "axios";

function Profile() {
    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;
    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

    const [profileUser, setProfileUser] = useState({});
    const slug = useParams().slug.toLowerCase();
    const history = useHistory();

    useEffect ( () => {
        const fetchProfileUser = async () => {
            try {
                const res = await axios.get(`/users?slug=${slug}`);
                setProfileUser(res.data);
            } catch(err) {
                history.push('/home');
            }
        }
        fetchProfileUser();
        document.getElementById('r1').checked = true; // Scroll to top slide when user changes
    }, [slug]);

  return (
    <>
        <NavbarNude/>
        <Slidershow>
            <Slides>
                <InputRadio type="radio" name="r" id="r1" />
                <InputRadio type="radio" name="r" id="r2" />
                <InputRadio type="radio" name="r" id="r3" />

                <Slide className="slide-1">
                    <ProfileOverview profileUser={profileUser} />
                </Slide>

                <Slide className="slide-2">
                    <ProfileActivity profileUser={profileUser} />
                </Slide>

                <Slide className="slide-3">
                    <ProfileFollowing profileUser={profileUser} />
                </Slide>

                <Navigation>
                    <Label htmlFor="r1" className="bar" id="bar1"></Label>
                    <Label htmlFor="r2" className="bar" id="bar2"></Label>
                    <Label htmlFor="r3" className="bar" id="bar3"></Label>
                </Navigation>
            </Slides>
        </Slidershow>
    </>
  )
}

export default Profile