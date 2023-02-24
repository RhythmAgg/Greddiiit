import React, { useCallback } from 'react'
import { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios'
import { Link } from 'react-router-dom';
import Logo from '../img/reddit_logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit } from '@fortawesome/free-brands-svg-icons'
import { faBars,faAnglesUp,faSignOut, faUsers, faSquarePlus, faSearch, faAnglesRight, faAnglesDown} from '@fortawesome/free-solid-svg-icons'
import ModalEdit from './ModalEdit';
import ModalFollowers from './ModalFollowers';
import ModalFollowing from './ModalFollowing';
import AccordionSubPosts from './AccordionSubPosts';
import UserOffcanvas from './UserOffcanvas';
import Footer from './Footer';
import ModalCreatePost from './ModalCreatePost';
import MySubOffCanvas from './MySubOffCanvas';
import Users from './MySubPage/Users';
import JoiningRequests from './MySubPage/JoiningRequests';
import Reports from './MySubPage/Reports';
import Stats from './MySubPage/Stats';

const MySubGreddiiitPage = () => {
    const params = useParams()
    const [followersdata,setFollowersData] = useState([])
    const [followingdata,setFollowingData] = useState([])
    const [allUsers,setAllUsers] = useState([])
    const [auth,setAuth] = useState({});
    const [allSubGreddiiits, setAllSubGreddiiits] = useState([])
    const [search,setSearch] = useState('')
    const [reports,setReports] = useState([])
    const [request,setRequest] = useState([])
    const [subdetails,setSubDetails] = useState({})

    const [allPosts, setAllPosts] = useState([])

    const [profileView,setProfileView] = useState(null)

    const [nav,setNav] = useState('users')

    const [loader,setLoader] = useState(null)
   
    const navigate = useNavigate()



    useEffect(() => {
        (async () => {
            window.scrollTo(0,0)
            document.querySelector("html").style.height = '100vh';
            document.querySelector("body").style.height = '100vh';
            const info = JSON.parse(localStorage.getItem('token'));
            if(info && info.accessToken)
            {
                try{
                    console.log(info.accessToken)
                    const response = await axios.post('/allSubGreddiiit/subPosts',
                    {"subname": params.sub},
                    {
                        "headers": {
                            "Authorization": `Bearer ${info.accessToken}`,
                            "Content-type": "application/json"
                        }
                    }
                    )
                    const response_ = await axios.get('/user', {
                        "headers": {
                            "Authorization": `Bearer ${info.accessToken}` 
                        }
                    }
                    )
                    const x = await axios.get('/follo', {
                        "headers": {
                            "Authorization": `Bearer ${info.accessToken}` 
                        }
                    }
                    )
                    const rep = await axios.get('/mySubGreddiiit/getReports',{
                        params: {
                            sub: `${params.sub}`
                        },
                        "headers": {
                            "Authorization": `Bearer ${info.accessToken}`  
                        },
                        
                    }
                    )
                    if(response.data.result.moderator !== response.data.logged_in)
                    {
                        navigate('/mySubGreddiiits')
                    }
                    setReports(rep.data.reports)
                    setAllUsers(response_.data.user)
                    setFollowersData(x.data.followers);
                    setFollowingData(x.data.following);
                    setAllPosts(response.data.sub_posts)
                    setAllSubGreddiiits(response.data.sub_posts)
                    setSubDetails(response.data.result)
                    setRequest((response_.data.user).filter(element => {
                        return (((response.data.result).requests).includes(element.userName))
                    }))
                    console.log('welcome')
                    document.addEventListener('keydown',handleKeyPress)
                    setAuth(response.data.logged_in);
                    setLoader('done')
                    return () => {
                        document.removeEventListener('keydown',handleKeyPress)
                    }
                    }catch(err){
                        console.log(err)
                    }
                
            }else{
                setAuth(null);
                setLoader('done')
            }
        })()
    },[])
    
    
    
    const logout = (e) => {
        localStorage.removeItem('token');
        navigate('/home')
    }

    const handleKeyPress = useCallback((e) => {
        if(e.key === 'j'){
            setNav('Join')
        }else if(e.key === 'r'){
            setNav('reports')
        }else if(e.key === 's'){
            setNav('stats')
        }else if(e.key === 'u'){
            setNav('users')
        }
    },[]) 

  return ( 
    (loader && auth)?(
        <div className='row gx-0 '>
        
        {profileView && <UserOffcanvas data={allUsers} profileView={profileView} 
                followingdata={followingdata}
                setFollowingData={setFollowingData}  
                logged={auth}  
        />}
        <MySubOffCanvas subdetails={subdetails} setNav={setNav} />
        <div className='col-lg-3 d-none d-lg-flex order-1 bg-dark  flex-column' style={{'color': 'white','rowGap': '1rem'}}>
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
            </div>
        </div>
        <div className='col-lg-9 order-2' style={{'maxHeight': '100vh','overflowY': 'scroll'}}>
            <div className="header-dashboard p-4 text-center">
            <Link className="navbar-brand" to='/home'>
            <FontAwesomeIcon icon={faReddit} size='3x' style={{'color': 'red','fontSize': '4rem'}} />
            </Link>
            <h1 style={{'color': 'white'}}><span style={{'color': 'red'}}>Gred</span>diiit</h1>
            </div>
        
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link className="nav-link" to="/">Profile Page</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/mySubGreddiiits">My Sub Greddiiits</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/AllSubGreddiiits">Sub Greddiiits</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/SavedPosts">Saved Posts</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/ChatRoom">Chat Room</Link>
                        </li>
                        </ul>
                        <div className='d-flex justify-content-end' style={{'flexGrow': '1','color': 'white'}}>
                        <FontAwesomeIcon icon={faSignOut} size='2x' style={{'cursor': 'pointer'}} 
                            onClick={logout}
                        />
                            <h4 className=''>Logout</h4>
                        </div>
                    </div>
                </div>

            </nav>
        
        <div className="d-flex" >
            <div className="flex-fill d-flex flex-column justify-content-center" >
            <div className='d-lg-none p-2 '>
                <FontAwesomeIcon icon={faBars} size='2x' data-bs-toggle='offcanvas'
                    data-bs-target='#subDetails'    
                />
                    <h3 className='m-2' style={{'display': 'inline'}} >Subgreddiiit Details</h3>
            </div>
            <div className="d-flex flex-fill flex-column followers flex-wrap" style={{'minHeight': '60vh'}}>
                {nav === 'users' && <Users 
                    search={search}
                    setSearch={setSearch}
                    allUsers={allUsers.filter(x => {
                     return (subdetails.followers).some(y => y.name === x.userName)
                    })}
                    blocked={allUsers.filter(x => {
                        return (subdetails.blocked).includes(x.userName)
                    })}
                    profileView={profileView}
                    setProfileView={setProfileView}
                    subdetails={subdetails}
                    setSubDetails={setSubDetails}
                />
                }
                {nav === 'Join' && 
                <JoiningRequests
                    search={search}
                    setSearch={setSearch}
                    allUsers={request}
                    setAllUsers={setRequest}
                    profileView={profileView}
                    setProfileView={setProfileView}
                    subdetails={subdetails}
                    setSubDetails={setSubDetails}
                />
                }
                {nav == 'reports' && 
                <Reports 
                    reports={reports}
                    setReports={setReports}
                    subdetails={subdetails}
                    setSubDetails={setSubDetails}
                
                />
                }
                {nav == 'stats' && 
                <Stats
                    subdetails={subdetails}
                    setSubDetails={setSubDetails}
                
                />
                }
            </div>

            </div>
        </div>
        
        <div className="mt-5 p-2 bg-dark text-white text-center" >
            <p>Made with <span className='hearts'>&#10084;</span> by Rhythm</p>
        </div>
        
    </div>

    </div>    
    ):loader ?
    <Navigate to='/home' />
    :<div>Loading...</div>
  )
}

export default MySubGreddiiitPage
