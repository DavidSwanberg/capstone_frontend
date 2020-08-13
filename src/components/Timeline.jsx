import React, { useState, useEffect } from 'react';
import apiUrl from '../ApiConfig';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';


const Timeline = () => {
    const [posts,setPosts] = useState([]);
    const history = useHistory();

  const makeAPICall = async () => {
    try {
      const response = await axios(`${apiUrl}/posts`)
      console.log('apiresponse',response.data)
      setPosts(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    makeAPICall()
  }, [])

  const profilelink =(id)=>{
    history.push(`/profile/${id}`)
  }

  const handleLike  = async(id,likes) => {

    let newlikes = likes + 1
    let res = await axios({
        url: `http://localhost:3000/posts/${id}`,
        method: "PUT",
        data: {"likes":`${newlikes}`},
        headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                  },
      })
    makeAPICall()
}

  const postMap = posts.map( post => (
    <div className="post" key={post.id}>
        <div className="postuser">
            <img className="profile-img" src={post.user.profile_img} />
        <div onClick={()=>profilelink(post.user_id)}>{post.user.username}</div>
        </div>
        <p>{post.content}</p>
        {post.img === null? null: <img src={post.img}/>}
        <div>{post.created_at}</div>
        <div>{post.likes}</div>
        <span className="like"onClick={()=>handleLike(post.id,post.likes)}>Like</span>
    </div>
))

    return(
        <div>
            Timeline
            {postMap}
        </div>
    )
}

export default Timeline;