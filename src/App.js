import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from './ApiConfig';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Timeline from './components/Timeline';
import NewPost from './components/NewPost';
import EditProfile from './components/EditProfile';
import { Route } from 'react-router-dom'; 

import './App.css';

const App = () => {
  const [user, setUser] = useState({})
  // const [posts,setPosts] = useState([]);

  // const makeAPICall = async () => {
  //   try {
  //     const response = await axios(`${apiUrl}/posts`)
  //     console.log('apiresponse',response)
  //     setPosts(response.data)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

   useEffect(() => {
   console.log('user',user)
 }, [user])

  return (
    <div className="App">
       <Route exact path ='/' component = {() => <Login setUser={setUser}/>}/>
       <Route path ='/timeline' component = {(props)=> <Timeline {...props}/>}/> 
       <Route path ='/sign-up' component = {()=> <SignUp/>}/>
       <Route path='/edit' component ={()=><EditProfile/>}/>
       <Route path ='/profile/:id' component = {(props)=><Profile {...props}/>}/>
       <Route path ='/new' component = {()=><NewPost user={user}/>}/>

    </div>
  );
}

export default App;
