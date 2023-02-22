import React from 'react'
import { useState, useEffect,useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faSave,faThumbsUp,faThumbsDown,faAnglesDown, faAnglesRight,faCommentAlt,faAnglesUp, faPersonWalkingArrowRight, faDoorOpen, faVoteYea} from '@fortawesome/free-solid-svg-icons'
import axios from '../api/axios'
import { Link, Navigate } from 'react-router-dom'
import Missing from './Missing'
import Comments from './Comments'

const AccordionSubPosts = ({data,allSubGreddiiits,setAllSubGreddiiits,setProfileView,profileView,auth,setAllPosts,allPosts,subdetails,postReport,setPostReport}) => {
    const [items,setItems] = useState([])
    const [changeIcon,setChangeIcon] = useState(null)
    const [mycomment,setMyComment] = useState('')
    useEffect(() => {
        console.log(data)
        const listItems = data
        setItems(listItems)
    },[data])

    let count='1';

    const addComment = async (post) => {
        if(mycomment === '')
        {
            alert('Comment cannot be empty')
            return 0
        }

        try{
            const info = JSON.parse(localStorage.getItem('token'));
            if(info && info.accessToken)
            {
                const response = await axios.post('/SubGreddiiitPage/addComment', 
                {'post_id': post._id,'content': mycomment},
                {
                    headers: {
                        "Authorization": `Bearer ${info.accessToken}`,
                        'Content-type': 'application/json'
                    }
                }
                )
                const temp = response.data.comments
                temp.reverse()
                console.log(temp)
                setAllPosts(allPosts.map(pst => {
                    var value = {...pst}
                    if(pst._id === post._id )
                    {
                        value.comments.push({'content': mycomment,'commentor': auth,'parent': post._id,'childcomments': [],'_id': temp[0]._id})
                        return value
                    }else return value
                }))
                setMyComment('')

            }else{

            }
        }catch(err){
            console.log(err)
        }
    }

    const upvote=async (post,up,down) => {
        if((post.upvotes).includes(auth))
        {
            alert('Post Already liked!')
            return 0;
        }
        try{
            const info = JSON.parse(localStorage.getItem('token'));
            if(info && info.accessToken)
            {
                const response = await axios.patch('/SubGreddiiitPage/upvote', 
                {'post_id': post._id},
                {
                    headers: {
                        "Authorization": `Bearer ${info.accessToken}`,
                        'Content-type': 'application/json'
                    }
                }
                )
                setAllPosts(allPosts.map(pst => {
                    var value = {...pst}
                    if(pst._id === post._id )
                    {
                        value.upvotes.push(auth)
                        if((value.downvotes).includes(auth))
                        {
                            value.downvotes = [...value.downvotes].filter(h => h!== auth)
                        }
                        return value
                    }else return value
                }))
            }else{
                Navigate('/home')
            }
        }catch(err){
            console.log(err)
        }   
    }

    const downvote=async (post,up,down) => {
        if((post.downvotes).includes(auth))
        {
            alert('Post Already disliked!')
            return 0;
        }
        try{
            const info = JSON.parse(localStorage.getItem('token'));
            if(info && info.accessToken)
            {
                const response = await axios.patch('/SubGreddiiitPage/downvote', 
                {'post_id': post._id},
                {
                    headers: {
                        "Authorization": `Bearer ${info.accessToken}`,
                        'Content-type': 'application/json'
                    }
                }
                )
                setAllPosts(allPosts.map(pst => {
                    var value = {...pst}
                    if(pst._id === post._id )
                    {
                        value.downvotes.push(auth)
                        if((value.upvotes).includes(auth))
                        {
                            value.upvotes = [...value.upvotes].filter(h => h!== auth)
                        }
                        return value
                    }else return value
                }))
            }else{
                Navigate('/home')
            }
        }catch(err){
            console.log(err)
        }  
    }
    const savePost = async (post) => {
        try{
            const info = JSON.parse(localStorage.getItem('token'));
            if(info && info.accessToken)
            {
                const response = await axios.patch('/SubGreddiiitPage/savepost', 
                {'post_id': post._id},
                {
                    headers: {
                        "Authorization": `Bearer ${info.accessToken}`,
                        'Content-type': 'application/json'
                    }
                }
                )
                alert('Post Saved')
            }else{
                Navigate('/home')
            }
        }catch(err){
            console.log(err)
        }
    }
    

  return (
    <>
    {items.map(item => {
        // if(item != 'admin'){
            count = (Number(count) + 1).toString()
            const x = 'C'+count
            const up = x + 'up'
            const down = x + 'down' 
            const y = "#" + x
            return(
                <div className="card bg-transparent" key={x}>
                    <div className="card-header d-flex">
                        <div className='votes d-flex flex-column align-content-center'>
                            <FontAwesomeIcon id={up} icon={faThumbsUp} className='flex-fill ' size='2x'
                                style={(item.upvotes).includes(auth)?{'color': 'green'}:{'color': 'black'}}
                                onClick={(e) => upvote(item,up,down)}
                            />
                            <FontAwesomeIcon id={down} icon={faThumbsDown} size='2x' className='flex-fill'
                                style={(item.downvotes).includes(auth)?{'color': 'red'}:{'color': 'black'}}
                                onClick={(e) => downvote(item,up,down)}
                            />
                        </div>
                        <div className='post flex-fill p-2'>
                            <div className='d-flex flex-wrap'>
                                {item.posted_by === subdetails.moderator?
                                    <h3 className='m-2 flex-fill bg-warning rounded' style={{'color': 'red'}}>{item.posted_by}</h3>
                                :subdetails.followers.find(here => {
                                   return here.name === item.posted_by && here.status === 'unblocked'
                                }) || subdetails.leftBefore.includes(item.posted_by)?
                                <h3 className='m-2 flex-fill' style={{'color': 'red'}}>{item.posted_by}</h3>                                
                                :subdetails.moderator === auth?
                                <h3 className='m-2 flex-fill' style={{'color': 'red'}}>Blocked: {item.posted_by}</h3>
                                :             
                                <h3 className='m-2 flex-fill' style={{'color': 'red'}}>---Blocked User---</h3>                
                                }
                                <div className='d-flex'>
                                    <button type='button' className="btn btn-transparent user_button m-2" style={{'wordBreak': 'unset','fontSize': '1.2rem'}}
                                    >
                                    <FontAwesomeIcon icon={faSave} style={{'fontSize': '1.5rem'}} onClick={() => savePost(item)} />
                                    </button>
                                    <button type='button' className="btn btn-transparent user_button m-2" style={{'wordBreak': 'unset','fontSize': '1.2rem'}}
                                    data-bs-toggle="offcanvas" data-bs-target="#profile" onClick={(e) => setProfileView(item.posted_by)}
                                    >Profile
                                    <FontAwesomeIcon icon={faAnglesRight} style={{'fontSize': '1.5rem'}} />
                                    </button>
                                </div>
                            </div>
                            <textarea className='p-2 rounded' style={{'width': '100%','backgroundColor': 'white','fontSize':'1.2rem','overflowY': 'scroll'}} rows="4" disabled
                                value={item.content} 
                            ></textarea>
                            <div className='d-flex flex-wrap'>
                                <div className='ms-2 me-2 mt-0 mb-0'>
                                    <FontAwesomeIcon icon={faThumbsUp} style={{'color': 'green'}} />
                                    <span className="badge bg-danger">{item.upvotes.length >0?item.upvotes.length:0}</span>
                                </div>
                                <div className='ms-2 me-2 mt-0 mb-0'>
                                    <FontAwesomeIcon icon={faThumbsDown} style={{'color': 'red'}} />
                                    <span className="badge bg-danger">{item.downvotes.length >0?item.downvotes.length:0}</span>
                                </div>
                                <div className='flex-fill d-flex justify-content-end' style={{'columnGap': '0.5rem'}}>
                                    <button type='button' className='btn btn-danger '
                                    data-bs-toggle='modal' data-bs-target='#myModal_report'
                                    onClick={() => setPostReport(item)}
                                    disabled={item.posted_by === auth || item.posted_by === subdetails.moderator || subdetails.blocked.includes(item.posted_by)?"disabled":""}
                                    >Report
                                    </button>
                                    <button type='button' className='btn btn-info '
                                    data-bs-toggle='collapse' data-bs-target={y}
                                    >
                                    <FontAwesomeIcon icon={faCommentAlt} size='1.5x' style={{'color': 'white'}}></FontAwesomeIcon>
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div id={x} className="collapse" data-bs-parent="#accordion">
                        <div className="card-body " style={{'color': 'white','maxHeight': '50vh','overflowY': 'scroll'}}>
                            <div className='d-flex mb-1'> 
                                <input type='text' className='p-1 flex-fill me-1' placeholder='Add Comment'
                                    value={mycomment} onChange={(e) => setMyComment(e.target.value)} 
                                ></input>
                                <button type='button' className='btn btn-primary'
                                    onClick={(e) => addComment(item)}
                                >Add</button>
                            </div>
                            
                            <div className='bg-secondary rounded'>
                                <ul className="list-group users_group list-group-flush">
                                {item.comments.length > 0?
                                <Comments
                                comments={[...item.comments].reverse().filter(cmt => cmt.parent === item._id)}
                                allcomments={[...item.comments]}
                                level={0}
                                parent={{}}
                                post={item}
                                allPosts={allPosts}
                                setAllPosts={setAllPosts}
                                auth={auth}
                                />
                                :<li className="list-group-item comment_list bg-transparent d-flex justify-content-center"
                                ><p style={{'color': 'white'}}>No Comment</p></li>
                                }
                                </ul>
                            </div>
                        
                         
                        </div>
                    </div>
                </div>
            )
    })}
    </>
  )
}

export default AccordionSubPosts
