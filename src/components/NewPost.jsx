import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../ApiConfig';
import { useHistory } from 'react-router-dom';

const NewPost = props => {
    const [user_id,setUser_id] = useState(0)
    const [content, setContent] = useState("");
    const [img,setImg] = useState(null);
    const history = useHistory();


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

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Content</label>
                    <input name="content"value={content} onChange={handleContentChange} type="text" placeholder="content"/>
                </div>
                <div>
                    <label>image url</label>
                    <input name="img"value={img} onChange={handleImgChange} type="text"/>
                </div>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewPost;