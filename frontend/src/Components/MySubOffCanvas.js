import React from 'react'
import Logo from '../img/reddit_logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown,faAnglesRight } from '@fortawesome/free-solid-svg-icons'


const MySubOffCanvas = ({subdetails,setNav}) => {
  return (
    <div class="offcanvas offcanvas-start" id="subDetails">
        <div class="offcanvas-body d-flex bg-dark flex-column" style={{'color': 'white','rowGap': '1rem','width': '100%'}}>
        <img src={Logo} style={{'width': '100%','margin-bottom': '0'}} />
        <h1 className='text-center mb-2 mt-0 bg-warning' style={{'color': 'black','wordBreak': 'break-all','cursor': 'pointer'}}
        data-bs-toggle='collapse' data-bs-target='#collapse_details'
        ><FontAwesomeIcon icon={faAnglesDown} />
        {subdetails.name}</h1>
        <div className='collapse' id='collapse_details'>
        <div className='d-flex flex-column' style={{'color': 'white','rowGap': '1rem'}}>
        <h4>Moderator: <span style={{'color': 'red'}}>{subdetails.moderator}</span></h4>
        <h4>Description</h4>
        <textarea className='bg-light mb-2 rounded p-1' rows='3' value={subdetails.description} disabled />
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
        </div>
        </div>
        <div className="list-group list-group-flush">
        <button type="button" className="ok list-group-item bg-dark mb-3 text-center" style={{'color': 'white','borderBottom': '1px solid white'}} 
        onClick={() => setNav('users')}
        >Users<FontAwesomeIcon icon={faAnglesRight} />
        </button>
        <button type="button" className="list-group-item bg-dark mb-3 list-group-item-action text-center" style={{'color': 'white','borderBottom': '1px solid white'}}
        onClick={() => setNav('Join')}
        >Join Requests<FontAwesomeIcon icon={faAnglesRight} />
        </button>
        <button type="button" className="list-group-item bg-dark mb-3 list-group-item-action text-center" style={{'color': 'white','borderBottom': '1px solid white'}}
        onClick={() => setNav('stats')}
        >Stats<FontAwesomeIcon icon={faAnglesRight} />
        </button>
        <button type="button" className="list-group-item bg-dark mb-3 list-group-item-action text-center" style={{'color': 'white','borderBottom': '1px solid white'}}
        onClick={() => setNav('reports')}
        >Reports<FontAwesomeIcon icon={faAnglesRight} />
        </button>
        <button type="button" className="btn btn-danger ms-auto  mt-2 " data-bs-dismiss="offcanvas">Close</button>
    </div>
        </div>
    </div>
  )
}

export default MySubOffCanvas
