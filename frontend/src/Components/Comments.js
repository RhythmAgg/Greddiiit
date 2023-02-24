import React from 'react'
import { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit } from '@fortawesome/free-brands-svg-icons'
import { faEdit,faSignOut, faUser,faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import axios from '../api/axios'
const Comments = ({comments,level,parent,post,allcomments,allPosts,setAllPosts,auth}) => {
    const [items,setItems] = useState([])
    const [reply,setReply] = useState('')

    useEffect(() => {
        const listItems = comments
        setItems(listItems)
    },[comments])

    const addReply = async () => {
        try{
            const info = JSON.parse(localStorage.getItem('token'));
            if(info && info.accessToken)
            {
                const response = await axios.post('/SubGreddiiitPage/addReply', 
                {'post_id': post._id,'parentcomment': parent._id,'reply': reply},
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
                        value.comments.push({'content': reply,'commentor': auth,'parent': parent._id,'childcomments': [],'_id': temp[0]._id})
                        value.comments = value.comments.map(cmt => {
                            var cmtt = {...cmt}
                            if(cmt._id === parent._id)
                            {
                                cmtt.childcomments.push(temp[0]._id)
                                return cmtt
                            }
                            else return cmtt
                        })
                        return value
                    }else return value
                }))
                setReply('')
                // window.location.reload()
                
            }else{

            }
        }catch(err){
            console.log(err)
        }
    }
    let count = 0
  return (
        <>
            {level > 0
            ?(
                <div className='d-flex mb-1'> 
                    <input type='text' className='p-1 flex-fill' placeholder='Reply'
                        value={reply} onChange={(e) => setReply(e.target.value)} 
                    ></input>
                    <button type='button' className='btn btn-primary'
                        onClick={(e) => addReply()}
                    >Reply</button>
                </div>
            )
            :   <div></div>
            }
            {items.length > 0
            ?   
            items.map(item => {
                // if(item != 'admin'){
                    let divid = `childcomments${item._id}${count}`
                    count++;
                    return(
                        <li className="list-group-item comment_list bg-transparent d-flex list-group-flush p-1" key={item.content}>
                            <div className='d-flex align-items-center me-2 bg-warning'>
                                <FontAwesomeIcon icon={faReddit} size='2x' style={{'color': 'red','margin': '0'}} />
                            </div>
                            <div className='flex-fill d-flex flex-column' style={{'color': 'white'}}>
                                <p className='mb-0' style={{'fontSize': '0.8rem','color': 'whitesmoke'}}>{item.commentor}</p>
                                <p className='flex-fill mb-0' style={{'fontSize': '1.2rem','wordBreak': 'break-word'}}>{item.content}</p>
                                <span style={{'fontSize': '.7rem','color': 'lightblue','cursor': 'pointer'}} data-bs-toggle="collapse" data-bs-target={`#${divid}`}>Replies<span>({item.childcomments.length})</span></span>
                                <div className='collapse' id={divid}>
                                {item.childcomments.length >0
                                ?
                                <Comments 
                                comments={(allcomments.filter(cmt => item.childcomments.includes(cmt._id))).reverse()}
                                level={level+1}
                                allcomments={allcomments}
                                parent={item}
                                post={post}
                                allPosts={allPosts}
                                setAllPosts={setAllPosts}
                                auth={auth}
                                />
                                :
                                <Comments 
                                comments={[]}
                                allcomments={allcomments}
                                level={level+1}
                                parent={item}
                                post={post}
                                allPosts={allPosts}
                                setAllPosts={setAllPosts}
                                auth={auth}
                                />
                                }
                                </div>
                            </div>
                        </li>
                    )
                // }
                // else return <></> 
            })
            :
            <li className="list-group-item comment_list bg-transparent d-flex list-group-flush p-1">
                <div className='d-flex align-items-center me-2 bg-warning'>
                    <FontAwesomeIcon icon={faReddit} size='2x' style={{'color': 'red','margin': '0'}} />
                </div>
                <div className='flex-fill d-flex flex-column' style={{'color': 'white'}}>
                    <p className='flex-fill mb-0' style={{'fontSize': '1.2rem','wordBreak': 'break-word'}}>No Replies</p>
                </div>
            </li>
            }
        </>
  )
}

export default Comments
