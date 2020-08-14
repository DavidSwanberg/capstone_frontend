import React, { useState, useEffect } from 'react';
import apiUrl from '../ApiConfig';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import Nav from './shared/Nav';


const Timeline = () => {
    const [posts,setPosts] = useState([]);
    const history = useHistory();

    const compare = (a, b) => {
        let comparison = 0;
        if (a.id > b.id) {
          comparison = -1;
        } else if (b.id > a.id) {
          comparison = 1;
       }
        return comparison;
      };

  const makeAPICall = async () => {
    try {
      const response = await axios(`${apiUrl}/posts`)
      console.log('apiresponse',response.data)
      setPosts(response.data.sort(compare))
    } catch (err) {
      console.error(err)
    }
    console.log('posts',posts)
  }

  useEffect(() => {
    makeAPICall()
    console.log('cookie timeline',document.cookie)
    console.log('token',localStorage)

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
  { localStorage.length === 0 ? null : <span className="like"onClick={()=>handleLike(post.id,post.likes)}>Like</span> }
    </div>
))



    return(
        <div>
            <Nav/>
            Timeline
            {postMap}
        </div>
    )
}

export default Timeline;