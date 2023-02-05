import React from 'react'
import Joinlist from './Joinlist'

const JoiningRequests = ({search,setSearch,profileView,setProfileView,allUsers,setAllUsers,subdetails,setSubDetails}) => {
  return (
    <div className='flex-fill bg-white all_users p-3 m-4 ' style={{'maxHeight': '60vh','overflowY': 'scroll'}}>
        <h1 className='text-center p-2 bg-info rounded'>Joining Requests</h1>
        <ul className="list-group users_group list-group-flush m-3">
            <Joinlist 
                data={search?(
                        (allUsers).filter(item => ((item.userName).toLowerCase()).includes(search.toLowerCase()))
                        ):allUsers 
                    }
                profileView={profileView}
                setProfileView={setProfileView}  
                setAllUsers={setAllUsers}
                allUsers={allUsers}
                setSubDetails={setSubDetails}
                subdetails={subdetails}

                />
        </ul>
    </div>
  )
}

export default JoiningRequests
