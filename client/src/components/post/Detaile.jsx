import { useParams } from "react-router";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"

const Detaile = () =>{
    const {id} = useParams();
    const [comme , setComm] = useState([]);
    const [post , setPost] = useState([]);
    const { user: currentUser } = useContext(AuthContext); 
    const [Message, setMessage] = useState([]);;
    
 
    useEffect ( () => {
        const fetchComme = async () => {
            const res = await axios.get(`/posts/${id}`);
            setPost(res.data);
        
        
        }
        fetchComme();
    })

    useEffect ( () => {
        const fetchComme = async () => {
            const res = await axios.get(`/posts/${post._id}/comment`);
            setComm(res.data);
            
        
        }
        fetchComme();
    })

    const envoi = (Message) =>{
        console.log( { userId: currentUser._id });
        console.log(  {id});
        console.log( Message);
        const test = { userId: currentUser._id };
        const id2 = {id};
    
        
        var newComme = {
            authorID:  String(test.userId),
            postID: String(id2.id) ,
            content: Message,
            state:0,
        }

        axios.post('/comment', newComme)
          .then(function (response) {
            console.log(response);
            window.location.reload(false);
          })
          .catch(function (error) {
            console.log(error.response.data);
          });
    }

    return(<div>

 
    <div className="postCenter">
                    <span className="postText">{post.content}</span>
                   
                </div>
        <div className="comme">
        <button className="commebtn">Commentaire</button>
        <div className="commeall">
            {comme.map((r)=>(
                <div><p>{r.content}</p> </div> 
            )
            )}
        </div>
        <label htmlFor="">Commentaire</label>
        <input type="text" id="comme"  value={Message}  onChange={(e) => setMessage(e.target.value)}/>
        <button onClick={() => envoi(Message)} >envoie</button>
    </div> 
    </div>
     
    )
}

export default Detaile;