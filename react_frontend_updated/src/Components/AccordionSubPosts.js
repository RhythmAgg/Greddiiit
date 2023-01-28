import React from 'react'
import { useState, useEffect,useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faSave,faThumbsUp,faThumbsDown,faAnglesDown, faAnglesRight,faAnglesUp, faPersonWalkingArrowRight, faDoorOpen} from '@fortawesome/free-solid-svg-icons'
import axios from '../api/axios'
import { Link } from 'react-router-dom'

const AccordionSubPosts = ({data,allSubGreddiiits,setAllSubGreddiiits,setProfileView,profileView,auth}) => {
    const [items,setItems] = useState([])
    const [changeIcon,setChangeIcon] = useState(null)
    useEffect(() => {
        console.log(data)
        const listItems = data
        setItems(listItems)
    },[data])

    let count='1';

    

  return (
    <>
    {items.map(item => {
        // if(item != 'admin'){
            count = (Number(count) + 1).toString()
            const x = 'C'+count
            const y = "#" + x
            return(
                <div className="card bg-transparent" key={x}>
                    <div className="card-header d-flex">
                        <div className='votes d-flex flex-column align-content-center'>
                            <FontAwesomeIcon icon={faThumbsUp} className='flex-fill' size='2x'/>
                            <FontAwesomeIcon icon={faThumbsDown} size='2x' className='flex-fill'/>
                        </div>
                        <div className='post flex-fill p-2'>
                            <div className='d-flex flex-wrap'>
                            <h3 className='m-2 flex-fill' style={{'color': 'red'}}>{item.posted_by}</h3>
                            <div className='d-flex'>
                            <button type='button' className="btn btn-transparent user_button m-2" style={{'wordBreak': 'unset','fontSize': '1.2rem'}}
                            >
                            <FontAwesomeIcon icon={faSave} style={{'fontSize': '1.5rem'}} />
                            </button>
                            <button type='button' className="btn btn-transparent user_button m-2" style={{'wordBreak': 'unset','fontSize': '1.2rem'}}
                            data-bs-toggle="offcanvas" data-bs-target="#profile" onClick={(e) => setProfileView(item.posted_by)}
                            >Profile
                            <FontAwesomeIcon icon={faAnglesRight} style={{'fontSize': '1.5rem'}} />
                            </button>
                            </div>
                            


                            </div>
                            <textarea className='p-2 rounded' style={{'width': '100%','backgroundColor': 'white','fontSize':'1.2rem','overflowY': 'scroll'}} rows="5" disabled
                                value={item.content} 
                            ></textarea>


                        </div>
                        <div className='save_join'>
                        </div>
                    </div>
                    <div id={x} className="collapse" data-bs-parent="#accordion">
                        <div className="card-body">
                        
                         
                        </div>
                    </div>
                </div>
            )
    })}
    </>
  )
}

export default AccordionSubPosts
