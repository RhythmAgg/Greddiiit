import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faAnglesRight } from '@fortawesome/free-solid-svg-icons'


import { useState } from 'react'
import axios from '../../api/axios'

const Userslist = ({data,profileView,setProfileView,subdetails}) => {
    const [items,setItems] = useState([])

    useEffect(() => {
        const listItems = data.filter(item => item.userName !== 'admin');
        setItems(listItems)
    },[data])

    useEffect(() => {
        console.log(profileView)
    },[profileView])
    const handleDelete = async (item) => {
        const info = JSON.parse(localStorage.getItem('token'));
        const response = await axios.patch('/follo/updateFollower',
            {"user_to_delete": item.name,'delete_id': item.name_id},
         {
            headers: {
                "Authorization": `Bearer ${info.accessToken}`,
                "Content-type": "application/json"
            }
        }
        )
        console.log(response);
        setItems(response.data.followers)
    }
  return (
        <>
            {items.map(item => {
                // if(item != 'admin'){
                    return(
                        <li className="list-group-item bg-transparent d-flex flex-wrap" key={item.userName}>
                            <FontAwesomeIcon icon={faUser} size='2x' style={{'color': 'orange'}} />
                            <h4 className='flex-fill ps-3' tyle={{'display': 'inline'}}>{item.userName}</h4>
                            <button type='button' className="btn btn-transparent user_button" style={{'padding': '5px'}}
                            data-bs-toggle="offcanvas" data-bs-target="#profile" onClick={(e) => setProfileView(item.userName)}
                            >
                            Profile
                            <FontAwesomeIcon icon={faAnglesRight} />
                            </button>
                        </li>
                    )
                // }
                // else return <></> 
            })}
        </>

  )
}

export default Userslist
