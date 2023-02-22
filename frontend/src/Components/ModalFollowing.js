import React, { useState } from 'react'
import FollowingList from './FollowingList'

const ModalFollowing = (props) => {
    const [search,setSearch] = useState('')

    console.log(props.data)
    const handleSearch = (e) => {
        setSearch(e.target.value)
        // const y =props.data.filter(item => ((item).toLowerCase()).includes(search.toLowerCase()))
        // console.log(y)

    }

  return (
<div className="modal fade" id="myModal-following" style={{'zIndex': '4'}}>
<div className="modal-dialog">
  <div className="modal-content">

    <div className="modal-header">
      <h4 className="modal-title">{props.userName} Following</h4>
      <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
    </div>

    <div className="modal-body">
      <form className="d-flex">
        <input className="form-control me-2" type="text" placeholder="Search Following"
            value={search}
            onChange={(e) => setSearch(e.target.value)}    
        />
      </form>
      <br></br>
      <ul className="list-group list-group-flush">
        <FollowingList setFollowingData={props.setFollowingData} logged={props.userName}
        data={search?(
                (props.data).filter(item => ((item.name).toLowerCase()).includes(search.toLowerCase()))
                ):props.data 
            }
        />
      </ul>
    </div>

    <div className="modal-footer">
      <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
    </div>

  </div>
</div>
</div>
        
  )
}

export default ModalFollowing
