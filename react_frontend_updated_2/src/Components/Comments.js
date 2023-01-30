import React from 'react'
import { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit } from '@fortawesome/free-brands-svg-icons'
import { faEdit,faSignOut, faUser,faAnglesRight } from '@fortawesome/free-solid-svg-icons'

const Comments = ({comments}) => {
    const [items,setItems] = useState([])

    useEffect(() => {
        const listItems = comments
        setItems(listItems)
    },[comments])
  return (
        <>
            {items.map(item => {
                // if(item != 'admin'){
                    return(
                        <li className="list-group-item comment_list bg-transparent d-flex list-group-flush p-1" key={item.content}>
                            <div className='d-flex align-items-center me-2 bg-warning'>
                                <FontAwesomeIcon icon={faReddit} size='2x' style={{'color': 'red','margin': '0'}} />
                            </div>
                            <div className='flex-fill d-flex flex-column' style={{'color': 'white'}}>
                                <p className='mb-1' style={{'color': 'whitesmoke'}}>{item.commentor}</p>
                                <p className='flex-fill' style={{'fontSize': '1.2rem','wordBreak': 'break-word'}}>{item.content}</p>
                            </div>
                        </li>
                    )
                // }
                // else return <></> 
            })}
        </>
  )
}

export default Comments
