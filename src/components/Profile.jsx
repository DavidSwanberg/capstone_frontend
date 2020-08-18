import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../ApiConfig';
import Nav from './shared/Nav';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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

 const convertDate = str =>{
    let arr = str.split('')
     let returnArr=[]
     for(let i=0;i<19;i++){
      if(arr[i]==='T'){
       returnArr.push(' ')
     }else{
      returnArr.push(arr[i])
    }
   }
   return returnArr.join('')
   }

      
      const postMap = posts.map( post => (
        <div className="post" key={post.id}>
            <div className="postuser">
                <img className="profile-img" src={user.profile_img} />
                <div className="top-wrapper-post">
                <div className="postusername">{user.username}</div>
                <p>{post.content}</p>
                </div>
            </div>
            {post.img === null? null: <div className="image-wrapper"><img className="post-img"src={post.img}/></div>}
          <div className="post-dash">
            <div className="date">{convertDate(post.created_at)}</div>
            <div>{post.likes} likes</div>
            {document.cookie === props.match.params.id ? <span id="nav-select" onClick={()=>destroy(post.id)}><FontAwesomeIcon id="nav-select" icon={["far","trash-alt"]}/></span>: null}
          </div>
        </div>
    ))

   
    return(
        <div>
            <Nav props={props}/>
            <div className="profile-header">
            <img className="profile-img2" src={user.profile_img}/>
            <div className="username-wrapper">
            <p className="postusername">{user.username} </p>
            {document.cookie === props.match.params.id ? <NavLink to='/edit'><FontAwesomeIcon id="settings" icon={["fa","cog"]}/></NavLink> : null}
            </div>
            </div>
            {postMap}
        </div>
    )
}

export default Profile;