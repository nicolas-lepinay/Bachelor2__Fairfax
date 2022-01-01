import "./share.css"
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons"
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";

import axios from "axios";

export default function Share() {

    const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;
    
    const {user} = useContext(UserContext);
    const content = useRef();
    const [file, setFile] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault();
        var newPost = {
            userId: user._id,
            category: "1",
            title: "Some title",
            content: content.current.value
        }

        if(file) {
            const formData = new FormData();
            const date = new Date(Date.now()).toISOString().replaceAll(':', '-'); // 2022-12-25T18-30-00.000Z
            
            const fileName = date + "_" + file.name;
            formData.append("name", fileName);
            formData.append("file", file);
            newPost.img = fileName;
            try {
                await axios.post("/upload", formData)
            } catch (err) {
                console.log(err)
            }
        }

        try {
            await axios.post("/posts", newPost);
            // window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user.avatar ? `${MEDIA}/profile/${user.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`} alt="" />
                    <input placeholder={`What's in your mind, ${user.username}?`} className="shareInput" ref={content} />
                </div>

                <hr className="shareHr"/>
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancel" onClick={ () => setFile(null) } />
                    </div>
            
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Photos</span>
                            <input style={{display: "none"}} type="file" id="file" accept=".png, .jpg, .jpeg, .gif, .webp" onChange={ (e) => setFile(e.target.files[0]) }/>
                        </label>

                        <div className="shareOption">
                            <Label htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>

                        <div className="shareOption">
                            <Room htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Location</span>
                        </div>

                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
