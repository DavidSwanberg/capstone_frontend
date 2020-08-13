import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../ApiConfig';


const Profile = props => {
    const [user, setUser] = useState([]);
    const [posts,setPosts]= useState([]);

    console.log('props',props)

    const makeAPICall = async () => {
        let dataposts = null
        try {
          const response = await axios(`${apiUrl}/users/${props.match.params.id}`)
          setUser(response.data)
          dataposts = response.data.posts
        } catch (err) {
          console.error(err)
        }
        setPosts(dataposts)
      }
    
      useEffect(() => {
        makeAPICall()
        console.log('cookie', document.cookie)
        console.log('user id',user.id)
      }, [])

      const destroy = async (id) => {
        await axios({
          url: `${apiUrl}/posts/${id}`,
          method: 'DELETE'
        })
        makeAPICall()
        console.log(id)
      }

      
      const postMap = posts.map( post => (
        <div className="post" key={post.id}>
            <div className="postuser">
                <img className="profile-img" src={user.profile_img} />
                <div>{user.username}</div>
            </div>
            <p>{post.content}</p>
            {post.img === null? null: <img src={post.img}/>}
            <div>{post.created_at}</div>
            <div>{post.likes}</div>
            {document.cookie === props.match.params.id ? <span onClick={()=>destroy(post.id)}>delete tweet</span>: null}
        </div>
    ))



    return(
        <div>
            Profile
            <img className="profile-img" src={user.profile_img}/>
            {user.username}
            {postMap}
        </div>
    )
}

export default Profile;