import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Post from '../../components/postDetails/Post'
import Comments from '../../components/postDetails/Comments'
import './postDetails.css'

function PostDetails() {
    return (
        <div className="postDetails"> 
            <Post />
            <Comments />
        </div>
    )
}


export default PostDetails