import React, { useState } from 'react'
import axios from '../api/axios'

const ModalCreatePost = ({sub,allPosts,setAllPosts}) => {
    const [content,setContent] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('clicded')
        try{
            const info = JSON.parse(localStorage.getItem('token'));
            if(info && info.accessToken)
            {
                const response = await axios.post('/allSubGreddiiit/createPost', 
                {'posted_in': sub,'content': content},
                {
                    headers: {
                        "Authorization": `Bearer ${info.accessToken}`,
                        'Content-type': 'application/json'
                    }
                }
                )
                setAllPosts([...allPosts,response.data.result])

            }else{

            }
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className="modal fade" id="myModal_createpost" style={{'zIndex': '4'}}>
        <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
            <h3 className="modal-title" style={{'color': 'orange'}}>Create Post</h3>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-outline">
                    <h5 className="form-label" htmlFor="postContent">Content</h5>
                    <textarea  id="postContent" className="form-control" name="content"
                        placeholder='post' rows='5'
                    value={content}
                    onChange={(e) => setContent(e.target.value)} required/>
                </div>
                <div className='d-flex justify-content-center m-3'>
                    <button type="submit" className="btn btn-success btn-block mb col-md-3" data-bs-dismiss="modal"
                    >
                    POST
                    </button>
                </div>
            </form>
            </div>

            <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>

        </div>
        </div>
        </div>
  )
}

export default ModalCreatePost
