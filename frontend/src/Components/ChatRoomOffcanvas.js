import React from 'react'
import Logo from '../img/reddit_logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faUser,faBars,faAnglesUp,faSignOut, faUsers, faSquarePlus, faSearch, faAnglesRight, faAnglesDown, faSadCry, faPerson} from '@fortawesome/free-solid-svg-icons'


const ChatRoomOffCanvas = ({search,setSearch,friends,getChatRoom}) => {
  return (
    <div class="offcanvas offcanvas-start" id="ChatRoomOffCanvas">
        <div class="offcanvas-body d-flex bg-dark flex-column" style={{'color': 'white','rowGap': '1rem','width': '100%'}}>
            <h1 className='mt-5 text-center'>Chat Room</h1>
            <h3 className='p-1'>All Friends</h3>
            <form className="d-flex m-4">
                <input className="form-control me-2" type="text" placeholder="Search User Name" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}  
                />
                <button className="btn btn-primary" type="button" >
                <FontAwesomeIcon icon={faSearch} size='1x'></FontAwesomeIcon>
                </button>
            </form>
            <div className="list-group list-group-flush">
            {friends.length > 0
            ?search?(friends.map(x => {
                if((x.name).toLowerCase().includes(search.toLowerCase()))
                {
                    return (
                        <button type="button" className="ok list-group-item bg-dark mb-3 text-center" style={{'color': 'white','borderBottom': '1px solid white'}} 
                        ><FontAwesomeIcon icon={faUser} style={{'color': 'orange'}} />
                        {x.name}
                        </button>
                    )
                }else return <div></div>
            }))
            :friends.map(friend => {
                return (
                <button type="button" className="ok list-group-item bg-dark mb-3 text-center" style={{'color': 'white','borderBottom': '1px solid white'}} 
                onClick={(e) => getChatRoom(friend)}
                ><FontAwesomeIcon icon={faUser}style={{'color': 'orange'}} />
                {friend.name}
                </button>
                )
            })
            :(
            <div className="list-group list-group-flush">
            <button type="button" className="ok list-group-item bg-dark mb-3 text-center" style={{'color': 'white','borderBottom': '1px solid white'}} 
            >No Friends!<FontAwesomeIcon icon={faSadCry} style={{'color': 'orange'}} />
            </button>
            <Link to='/' >Make Friends</Link>
            </div>
            )
            }
        </div>
        <button type="button" className="btn btn-danger ms-auto  mt-2 " data-bs-dismiss="offcanvas">Close</button>
        </div>
    </div>
  )
}

export default ChatRoomOffCanvas
