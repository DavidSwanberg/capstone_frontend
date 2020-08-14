import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom'

const SignUp = () => {
    const [input, setInput] = useState({ username: "", password: "", profile_img:"" });
    const [error, setError] = useState(false);
    const history = useHistory()

    const handleSubmit = async(event)=>{
        console.log('submit',input)
        event.preventDefault()
        let res = await axios({
            url: "http://localhost:3000/users",
            method: "POST",
            data: input,
            headers: {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                      },
            
          }).then( 
              (response) => {
                console.log('res',response)
                history.push('/')
              },
              (error)=>{ setError(true)}
          );
                   
    }

    const handleChange = (event) => {
        //console.log("event", event.target.name, event.target.value);
        setInput({
          ...input,
          [event.target.name]: event.target.value,
        });
      };

    return(
        <div>
            <form class="ui form" onSubmit={handleSubmit}>
                <div class="field">
                    <label>Username</label>
                    <input name="username"value={input.username} onChange={handleChange} type="text" placeholder="username"/>
                </div>
                {error === true ? <p>Choose a different username</p> : null}
                <div class="field">
                    <label>Password</label>
                    <input name="password"value={input.password} onChange={handleChange} type="password" placeholder="password"/>
                </div>
                <div class="field">
                    <label>Profile Photo URL</label>
                    <input name="profile_img"value={input.profile_img} onChange={handleChange} type="text" placeholder="http://example.com/image.jpg"/>
                </div>
                
                <button class="ui button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUp;