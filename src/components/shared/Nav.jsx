import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'

const Nav = props => {
    const history = useHistory();

    const profilelink =(id)=>{
        history.push(`/profile/${id}`)
      }
    
    const signOut =()=>{
        document.cookie = null
        localStorage.clear()
        history.push('/')
    }
    
    return(
    <nav>
        <NavLink to='/timeline'>Home</NavLink>
        <NavLink to='/new'>New Post</NavLink>
        <span onClick={()=>profilelink(document.cookie)}>Profile</span>
        {localStorage.length === 0 ? <NavLink to='/'>Sign In</NavLink> : <span onClick={signOut}>sign out</span>}
    </nav>
)}


export default Nav;