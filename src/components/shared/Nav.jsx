import React from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    console.log('props nav', props.props.match)
    
    return(
    <nav>
        <div className='navbox'>
        {props.props.match.path === '/timeline'?
         <NavLink id='nav-selected' to='/timeline'><FontAwesomeIcon icon={["fa","stream"]} /></NavLink>
         :<NavLink id='nav-select'to='/timeline'><FontAwesomeIcon icon={["fa","stream"]} /></NavLink>}

         {props.props.match.path === '/new' ?
        <NavLink id='nav-selected' to='/new'><FontAwesomeIcon icon={["fa","pen-nib"]}/></NavLink>
        : <NavLink id='nav-select'to='/new'><FontAwesomeIcon icon={["fa","pen-nib"]}/></NavLink>}

        {props.props.match.url === `/profile/${document.cookie}` ?
        <span id='nav-selected'onClick={()=>profilelink(document.cookie)}><FontAwesomeIcon icon={["fa","user"]}/></span>
        :<span id='nav-select'onClick={()=>profilelink(document.cookie)}><FontAwesomeIcon icon={["fa","user"]}/></span> }

        {localStorage.length === 0 ? <NavLink id='nav-select'to='/'>Sign In</NavLink> : <span id='nav-select'onClick={signOut}>sign out</span>}
        </div>
    </nav>
)}


export default Nav;