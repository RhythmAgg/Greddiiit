import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import axios from '../api/axios'

const FollowersList = ({data,setFollowersData,logged}) => {
    const [items,setItems] = useState([])

    useEffect(() => {
        const listItems = data.filter(item => item.name !== logged );
        setItems(listItems)
    },[data])
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
        setFollowersData(response.data.followers)
        
    }
  return (
        <>
            {items.map(item => {
                // if(item != 'admin'){
                    return(
                        <li className="list-group-item d-flex mb-3" key={item.name}>
                            <FontAwesomeIcon icon={faUser} size='2x' style={{'color': 'blue'}} />
                            <h3 className='flex-fill ps-3' tyle={{'display': 'inline'}}>{item.name}</h3>
                            <FontAwesomeIcon icon={faTrash} size='2x' style={{'color': 'grey'}} 
                                onClick = {() => handleDelete(item)}
                            />
                        </li>
                    )
                // }
                // else return <></> 
            })}
        </>

  )
}

export default FollowersList
