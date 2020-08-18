import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../ApiConfig';
import Nav from './shared/Nav';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NewPost = props => {
    const [user_id,setUser_id] = useState(0)
    const [content, setContent] = useState("");
    const [img,setImg] = useState(null);
    const [addImage,setAddImage]= useState(false);
    const history = useHistory();


    const toggleAddImage = ()=>{
        setAddImage(!addImage)
    }

    const handleContentChange = (event) => {
        //console.log("event", event.target.name, event.target.value);
        setContent(event.target.value);
      };

    const handleImgChange = (event) =>{
        setImg(event.target.value)
    }

    const handleSubmit  = async(evt) => {
        evt.preventDefault()
        console.log("submit data", JSON.stringify({content,
            user_id}))
        let res = await axios({
            url: `${apiUrl}/posts`,
            method: "POST",
            data: JSON.stringify({
                content,
                img,
                user_id
            }),
            headers: {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                      },
          })

        console.log("res",res)
        history.push('/timeline')
    }


    useEffect(() => {
        handleUser(document.cookie)
        console.log('cookie',document.cookie)
      }, [])

    const handleUser = (cookie) =>{
        setUser_id(cookie)
    }

    const cancel = ()=>{
        history.push('/timeline')
    }

    return(
        <div className="new-container">
        <div className="new-post">
            <form onSubmit={handleSubmit}>
            <div className="input-dash">
                <span id="cancel"onClick={cancel}>X</span>
                <div>
                    <button id="post-button"type="submit">Submit</button>
                    <span onClick={toggleAddImage}><FontAwesomeIcon icon={["fa","image"]}/></span>
                </div>
            </div>
                    {addImage === false ? null : <div><input id="img-input"name="img"value={img} onChange={handleImgChange} type="text" placeholder="image-url"/></div>}
                <div>
                    <textarea maxlength='255' id="content"name="content"value={content} onChange={handleContentChange} type="text" placeholder="content"/>
                </div>
            </form>
        </div>
        </div>
    )
}

export default NewPost;