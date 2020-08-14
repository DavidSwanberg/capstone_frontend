import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../ApiConfig';
import Nav from './shared/Nav'
import { useHistory } from 'react-router-dom';

const EditProfile = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [profile_img,setProfile_img]=useState(null)
    const [id,setId]=useState(0)
    const history = useHistory();


    useEffect(() => {
        handleUser(document.cookie)
        console.log('cookie',document.cookie)
        makeAPICall()
      }, [])


      const makeAPICall = async () => {
        try {
          const response = await axios(`${apiUrl}/users/${document.cookie}`)
          setUsername(response.data.username)
          setProfile_img(response.data.profile_img)
          console.log('api data',response.data)
        } catch (err) {
          console.error(err)
        }
      }

    const handleUser = (cookie) =>{
        setId(cookie)
    }

    const handleSubmit = async(event)=>{
        console.log('submit',JSON.stringify({
            username,
            password,
            profile_img
        }))
        event.preventDefault()
        let res = await axios({
            url: `${apiUrl}/users/${id}`,
            method: "PUT",
            data: JSON.stringify({
                username,
                password,
                profile_img
            }),
            headers: {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                      },
          }).then( 
              (response) => {
                console.log('res',response)
                history.push(`/profile/${id}`)
              },
              (error)=>{ console.log('error')}
          );
                   
    }


    const handlePasswordChange=(event)=>{
        setPassword(event.target.value)
    }
    
    const handleUsernameChange = (event) =>{
        setUsername(event.target.value)
    }
    
    const handleImgChange = (event) =>{
        setProfile_img(event.target.value)
    }
    
    const destroy = async () => {
        await axios({
          url: `${apiUrl}/users/${id}`,
          method: 'DELETE'
        })
        history.push(`/`)
        console.log('profile deleted')
      }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Change Username</label>
                    <input name="username"value={username} onChange={handleUsernameChange} type="text" placeholder="username"/>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password"value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
                </div>
                <div>
                    <label>Profile Photo URL</label>
                    <input name="profile_img"value={profile_img} onChange={handleImgChange} type="text" placeholder="http://example.com/image.jpg"/>
                </div>
                
                <button type="submit">Submit</button>
            </form>
            <p onClick={()=>destroy()}>DELETE ACCOUNT</p>
        </div>
    )
}

export default EditProfile;