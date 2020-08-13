import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom'

const Login = props => {
    //console.log('props', props)
    const [input, setInput] = useState({ username: "", password: "" });
    const history = useHistory()

    const handleLogin = (user) => {
        props.setUser(user)
      }

    const handleChange = (event) => {
        //console.log("event", event.target.name, event.target.value);
        setInput({
          ...input,
          [event.target.name]: event.target.value,
        });
      };

    const handleSubmit  = async(evt) => {
        evt.preventDefault()
        let res = await axios({
            url: "http://localhost:3000/users/login",
            method: "POST",
            data: input,
            headers: {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                      },
          })
        document.cookie = res.data.user.id
         console.log("res",res)
         localStorage.setItem('token',res.data.token)
         handleLogin(res.data.user)
        console.log(localStorage)
        history.push(`/timeline`)
    }


    
    return(
        <div>
            <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input name="username"value={input.username} onChange={handleChange} type="text" placeholder="username"/>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password"value={input.password} onChange={handleChange} type="password" placeholder="password"/>
                </div>
                
                <button type="submit">Submit</button>
            </form>
        </div>
        <NavLink to='/sign-up'>sign up for account</NavLink>
        <NavLink to='/new'>create a post</NavLink>
        </div>
    )
} 

export default Login;

