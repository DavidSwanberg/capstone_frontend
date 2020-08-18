import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        console.log('cookie',document.cookie)
        console.log('token',localStorage)
      }, [])


    
    return(
        <div class="login">
            <h1>welcome to poster</h1>
            <div>
            <div className="landing-container">
            <img id="landing-img"src="https://media.giphy.com/media/efUcLJePY6RkA/giphy.gif"/>
            </div>
            <form id="login-form"class="form" onSubmit={handleSubmit}>
                <div>
                    <input id="login-field"class="field" name="username"value={input.username} onChange={handleChange} type="text" placeholder="username"/>
                </div>
                <div>
                    <input id="login-field"class="field" name="password"value={input.password} onChange={handleChange} type="password" placeholder="password"/>
                </div>
                
                <button class="sign-up-button" type="submit">Submit</button>
            </form>
        </div>
        <NavLink id="sign-up" to='/sign-up'>sign up for account</NavLink>
        </div>
    )
} 

export default Login;

