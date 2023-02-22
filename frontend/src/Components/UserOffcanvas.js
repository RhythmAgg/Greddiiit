import React, { useEffect, useState } from 'react'
import Image from '../img/avatar.jpeg'
import axios from '../api/axios'

const UserOffcanvas = ({data,profileView,followingdata,setFollowingData,logged}) => {
  const [check,setCheck] = useState('Follow')
  console.log(data)
  const items = data.filter(item => item.userName === profileView);

  const followUser = async () => {
    console.log('clicked')
    const info = JSON.parse(localStorage.getItem('token'));
        const response = await axios.patch('/follo/addFollower',
            {"user_to_add": items[0].userName,'add_id': items[0]._id},
         {
            headers: {
                "Authorization": `Bearer ${info.accessToken}`,
                "Content-type": "application/json"
            }
        }
        )
        console.log(response);
        setFollowingData(response.data.following)

  }
  const checkFollower = () => {
    const isFound = followingdata.some(element => {
      if (element.name === items[0].userName || items[0].userName === logged || logged === 'admin') {
        return true;
      }
      return false;
    });
    // if(isFound)
    // {
    //   setCheck('Following!')
    // }
    // else{
    //   setCheck('Follow')
    // }
    return isFound

  }
  return (
    <div className="offcanvas offcanvas-end text-bg-dark" id="profile">
    <img src={Image} alt='profile img' style={{'width': '100%'}}></img>
    <div className="offcanvas-header">
        <h1 className="offcanvas-title">{items[0].userName}</h1>
        <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas"></button>
    </div>
    <div className="offcanvas-body" style={{'lineHeight': '2rem'}}>
        <h5 className='mb-3'>First Name: <span style={{'color': 'orange'}}>{items[0].firstName.substring(0,1).toUpperCase()}</span>
        <span style={{'color': 'orange'}}>{items[0].firstName.substring(1)}</span></h5>
        <h5 className='mb-3'>Last Name: <span style={{'color': 'orange'}}>{items[0].lastName.substring(0,1).toUpperCase()}</span>
        <span style={{'color': 'orange'}}>{items[0].lastName.substring(1)}</span></h5>        
        <h5 className='mb-3'>Age: <span style={{'color': 'orange'}}>{items[0].age}</span></h5>
        <h5 className='mb-3'>Contact: <span style={{'color': 'orange'}}>{items[0].contact.substring(0,1).toUpperCase()}</span>
        <span style={{'color': 'orange'}}>{items[0].contact.substring(1)}</span></h5>
        <h5 className='mb-3'>Email: <span style={{'color': 'orange'}}>{items[0].email.substring(0,1).toUpperCase()}</span>
        <span style={{'color': 'orange'}}>{items[0].email.substring(1)}</span></h5>
        
        <button className="btn btn-light mt-4 follow_button" style={{'width': '50%','display': 'block','margin': 'auto'}}
         type="button"
         onClick={(e) => followUser()}
         disabled={checkFollower()? "disabled": ""}
         data-bs-dismiss="offcanvas"
         >{check}</button>
    </div>
    </div>
  )
}

export default UserOffcanvas
