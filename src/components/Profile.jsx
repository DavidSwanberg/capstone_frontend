import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../ApiConfig';
import Nav from './shared/Nav';
import { NavLink, useHistory } from 'react-router-dom';


const Profile = props => {
    const [user, setUser] = useState([]);
    const [posts,setPosts]= useState([]);

    console.log('props',props)

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
        let dataposts = null
        try {
          const response = await axios(`${apiUrl}/users/${props.match.params.id}`)
          setUser(response.data)
          dataposts = response.data.posts
        } catch (err) {
          console.error(err)
        }
        setPosts(dataposts.sort(compare))
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
            <Nav/>
            Profile
            <img className="profile-img" src={user.profile_img}/>
            {user.username}
            {document.cookie === props.match.params.id ? <NavLink to='/edit'>Edit Account</NavLink> : null}
            {postMap}
        </div>
    )
}

export default Profile;