import React from 'react'
import Logo from '../img/reddit_logo.jpg'


const SubOffCanvas = ({subdetails}) => {
  return (
    <div class="offcanvas offcanvas-start" id="subDetails">
        <div class="offcanvas-body d-flex bg-dark flex-column" style={{'color': 'white','rowGap': '1rem','width': '100%'}}>
        <img src={Logo} style={{'width': '100%','margin-bottom': '0'}} />
        <h1 className='text-center mb-2 mt-0 bg-warning' style={{'color': 'black','wordBreak': 'break-all'}}>{subdetails.name}</h1>
        <h4>Moderator: <span style={{'color': 'red'}}>{subdetails.moderator}</span></h4>
        <h4>Description</h4>
        <textarea className='bg-light mb-2 rounded p-1' style={{'minHeight': '100px'}} value={subdetails.description} disabled />
        <div>
        <h4 style={{'display': 'inline'}}>Tags:</h4>
        {subdetails.tags.map(word => {
            return(
            <span class="badge rounded-pill bg-success m-1" style={{'fontSize': '1rem'}}>{word}</span>
            )
        })}
        </div>
        <div>
        <h4 style={{'display': 'inline'}}>Banned Words:</h4>
        {subdetails.bannedWords.map(word => {
            return(
            <span class="badge rounded-pill bg-danger m-1" style={{'fontSize': '1rem'}}>{word}</span>
            )
        })}
        </div>
        <button type="button" className="btn btn-info ms-auto me-auto mt-2" style={{'width': '30%'}}>
        Users <span className="badge bg-danger">{subdetails.followers.length}</span>
        </button>
        <button type="button" className="btn btn-danger ms-auto  mt-2 " data-bs-dismiss="offcanvas">Close</button>

        </div>
    </div>
  )
}

export default SubOffCanvas
