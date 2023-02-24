import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose,faCheck,faUser,faAnglesRight } from '@fortawesome/free-solid-svg-icons'


import { useState } from 'react'
import axios from '../../api/axios'

const Joinlist = ({data,profileView,setProfileView,allUsers,setAllUsers,subdetails,setSubDetails}) => {
    const [items,setItems] = useState([])

    useEffect(() => {
        const listItems = data.filter(item => item.userName !== 'admin');
        setItems(listItems)
    },[data])

    useEffect(() => {
        console.log(profileView)
    },[profileView])
    const accept = async (item) => {
        const info = JSON.parse(localStorage.getItem('token'));
        const response = await axios.patch('/mySubGreddiiit/accept',
         {"sub": subdetails.name,'requesting': item.userName,'requesting_id': item._id},
         {
            headers: {
                "Authorization": `Bearer ${info.accessToken}`,
                "Content-type": "application/json"
            }
        }
        )
        setAllUsers(allUsers.filter(y => {
            return (y.userName !== item.userName)
        }))
        const temp = subdetails
        temp.followers.push({'name': item.userName,'name_id': item._id,'status': 'unblocked'})
        console.log(temp)
        setSubDetails(temp)
        console.log(response);
        // setItems(response.data.followers)
    }
    const reject = async (item) => {
        const info = JSON.parse(localStorage.getItem('token'));
        const response = await axios.patch('/mySubGreddiiit/reject',
         {"sub": subdetails.name,'requesting': item.userName,'requesting_id': item._id},
         {
            headers: {
                "Authorization": `Bearer ${info.accessToken}`,
                "Content-type": "application/json"
            }
        }
        )
        setAllUsers(allUsers.filter(y => {
            return (y.userName !== item.userName)
        }))
        console.log(response);
        // setItems(response.data.followers)
    }
  return (
        <>
            {items.map(item => {
                // if(item != 'admin'){
                    return(
                        <li className="list-group-item bg-transparent d-flex flex-wrap mb-4" key={item.userName}>
                            <FontAwesomeIcon icon={faUser} size='2x' style={{'color': 'orange'}} />
                            <h4 className='flex-fill ps-3' tyle={{'display': 'inline'}}>{item.userName}</h4>
                            <div>
                            <button type='button' className="btn btn-transparent bg-success m-1" style={{'padding': '5px'}}
                            onClick = {() => accept(item)}
                            >
                            <FontAwesomeIcon icon={faCheck} style={{'fontSize': '1.5rem'}} />
                            </button>
                            <button type='button' className="btn btn-transparent bg-danger m-1" style={{'padding': '5px'}}
                            onClick = {() => reject(item)}
                            >
                            <FontAwesomeIcon icon={faClose} style={{'fontSize': '1.5rem'}} />
                            </button>
                            <button type='button' className="btn btn-transparent user_button" style={{'padding': '5px'}}
                            data-bs-toggle="offcanvas" data-bs-target="#profile" onClick={(e) => setProfileView(item.userName)}
                            >
                            Profile
                            <FontAwesomeIcon icon={faAnglesRight} />
                            </button>
                            </div>
                        </li>
                    )
                // }
                // else return <></> 
            })}
        </>

  )
}

export default Joinlist
