import React from 'react'
import Userslist from './Userslist'

const Users = ({search,setSearch,profileView,setProfileView,allUsers,subdetails,blocked}) => {
  return (
    <>
        <form className="d-flex m-4">
            <input className="form-control me-2" type="text" placeholder="Search User Name" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}  
            />
            <button className="btn btn-primary" type="button" disabled>Search</button>
        </form>
        <div className='flex-fill bg-white all_users p-3 d-flex flex-column' style={{'maxHeight': '50vh','overflowY': 'scroll'}}>
          <div className='rounded p-3 mb-3' style={{'border': '1px solid black'}}>
            <h4 className='text-center' style={{'color': 'green'}}>Current Followers</h4>
            <ul class="list-group users_group list-group-flush">
              <Userslist 
                  data={search?(
                          (allUsers).filter(item => ((item.userName).toLowerCase()).includes(search.toLowerCase()))
                          ):allUsers 
                      }
                  profileView={profileView}
                  setProfileView={setProfileView}
                  subdetails={subdetails}
              />
            </ul>
          </div>
          <div className='rounded p-3' style={{'border': '1px solid black'}}>
            <h4 className='text-center' style={{'color': 'red'}}>Blocked</h4>
            <ul class="list-group users_group list-group-flush">
              <Userslist 
                  data={blocked}
                  profileView={profileView}
                  setProfileView={setProfileView}
                  subdetails={subdetails}
              />
            </ul>
          </div>
        </div>
    </>
                    
  )
}

export default Users
