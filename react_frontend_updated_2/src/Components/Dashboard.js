import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from '../api/axios'
import { Link } from 'react-router-dom';
import Logo from '../img/reddit_logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit } from '@fortawesome/free-brands-svg-icons'
import { faEdit,faSignOut, faUsers } from '@fortawesome/free-solid-svg-icons'
import ModalEdit from './ModalEdit';
import ModalFollowers from './ModalFollowers';
import ModalFollowing from './ModalFollowing';
import AllUserlist from './AllUserlist';
import UserOffcanvas from './UserOffcanvas';
import Footer from './Footer';



const Dashboard = () => {
    const [auth,setAuth] = useState({});
    const [followersdata,setFollowersData] = useState([])
    const [followingdata,setFollowingData] = useState([])
    const [allUsers,setAllUsers] = useState([])
    const [edit,setEdit] = useState('');
    const [followers,setFollowers] = useState('');
    const [search,setSearch] = useState('')
    const [profileView,setProfileView] = useState(null)
    const [loader,setLoader] = useState(null)
    const navigate = useNavigate()

    
    useEffect(() => {
        (async () => {
            window.scrollTo(0,0)
            document.querySelector("html").style.height = '100vh';
            document.querySelector("body").style.height = '100vh';
            // document.querySelector("body").setAttribute('onbeforeunload','handleback(event)')
            const info = JSON.parse(localStorage.getItem('token'));
            if(info && info.accessToken)
            {
                const response = await axios.get('/user', {
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
                setAllUsers(response.data.user)
                const filter = response.data.user.filter(item => item.userName === response.data.logged_in)
                console.log((filter[0]))
                setAuth((filter[0]));
                setFollowersData(x.data.followers);
                setFollowingData(x.data.following);
                setLoader('done')
                console.log(response);
                console.log(x);

            }else{
                setAuth(null);
                setLoader('done')
            }
        })()
    },[])
    
    const textEffect = {
        'color': 'orange',
    }
    
    const handleEdit = (e) => {
        console.log('clicked')
        setEdit(e)
    }
    const handleFollowers = (e) => {
        setFollowers(e)
    }
    const logout = (e) => {
        localStorage.removeItem('token');
        navigate('/home')
    }
  return (
    loader && auth?(
        <div>
            {edit && <ModalEdit field={edit} auth={auth} setAuth={setAuth} />}
            <ModalFollowers userName={auth.userName} 
                data={followersdata}
                setFollowersData={setFollowersData}
            />
            <ModalFollowing userName={auth.userName} 
            data={followingdata}
            setFollowingData={setFollowingData}
            />
            {profileView && <UserOffcanvas data={allUsers} profileView={profileView} 
                followingdata={followingdata}
                setFollowingData={setFollowingData}  
                logged={auth.userName}  
            />}
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
                        <Link className="nav-link active" to="/">Profile Page</Link>
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
        
        <div className="container mt-5" style={{'minHeight': '70vh','overflowY': 'scroll'}}>
            <div className="row" style={{'height': '70vh'}}>
            <div className="col-sm-5 d-flex align-items-center" style={{'backgroundColor': 'whitesmoke','lineHeight': '2.5rem'}}>
                <div style={{'width': '100%'}}>
                <h1>About Me </h1>
                <h5 style={{'display': 'inline'}}> User Name: <span style={{'color': 'red'}}> {auth.userName}</span></h5>
                <br></br>
                <FontAwesomeIcon icon={faEdit} style={{'display': 'inline','cursor': 'pointer'}} onClick={(e) => handleEdit('firstName')}
                data-bs-toggle="modal" data-bs-target="#myModal"    
                />
                <h5 style={{'display': 'inline'}}> First Name: <span style={textEffect}> {auth.firstName}</span></h5>
                <br></br>
                <FontAwesomeIcon icon={faEdit} style={{'display': 'inline','cursor': 'pointer'}} onClick={(e) => handleEdit('lastName')}
                data-bs-toggle="modal" data-bs-target="#myModal"    
                />
                <h5 style={{'display': 'inline'}}> Last Name: <span style={textEffect}> {auth.lastName}</span></h5>
                <br></br>
                <FontAwesomeIcon icon={faEdit} style={{'display': 'inline','cursor': 'pointer'}} onClick={(e) => handleEdit('email')}
                data-bs-toggle="modal" data-bs-target="#myModal"    
                />
                <h5 style={{'display': 'inline','overflowWrap': 'break-word'}}> Email: <span style={textEffect}> {auth.email}</span></h5>
                <br></br>
                <FontAwesomeIcon icon={faEdit} style={{'display': 'inline','cursor': 'pointer'}} onClick={(e) => handleEdit('age')}
                data-bs-toggle="modal" data-bs-target="#myModal"    
                />
                <h5 style={{'display': 'inline'}}> Age: <span style={textEffect}> {auth.age}</span></h5>
                <br></br>
                <FontAwesomeIcon icon={faEdit} style={{'display': 'inline','cursor': 'pointer'}} onClick={(e) => handleEdit('contact')}
                data-bs-toggle="modal" data-bs-target="#myModal"    
                />
                <h5 style={{'display': 'inline'}}> Contact: <span style={textEffect}> {auth.contact}</span></h5>
                </div>
            </div>
            <div className="col-sm-7 d-flex flex-column followers flex-wrap">
                <div className='d-flex flex-wrap'>
                    <div className='d-flex align-items-center justify-content-center flex-fill flex-wrap'>
                    <FontAwesomeIcon icon={faUsers} style={{'display': 'inline','cursor': 'pointer','color': 'orange'}} size='2x'/>
                    <h3 style={{'padding': '10px'}}>Followers <span class="badge bg-success" style={{'fontSize': '1.5rem','cursor': 'pointer'}}
                    onClick={(e) => handleFollowers()}
                    data-bs-toggle="modal" data-bs-target="#myModal-followers">{followersdata.length - 1}</span></h3>
                    </div>
                    <div className='d-flex align-items-center justify-content-center flex-fill flex-wrap'>
                    <FontAwesomeIcon icon={faUsers} style={{'display': 'inline','cursor': 'pointer','color': 'orange'}} size='2x' />
                    <h3 style={{'padding': '10px'}}>Following <span class="badge bg-success" style={{'fontSize': '1.5rem','cursor': 'pointer'}}
                    onClick={(e) => handleFollowers()}
                    data-bs-toggle="modal" data-bs-target="#myModal-following">{followingdata.length -1}</span> </h3>
                    </div>
                </div>
                <div className='flex-fill p-4 d-flex flex-column bg-light'>
                    <form className="d-flex mb-4">
                        <input className="form-control me-2" type="text" placeholder="Search User Name" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}  
                        />
                        <button className="btn btn-primary" type="button" disabled>Search</button>
                    </form>
                    <div className='flex-fill bg-white all_users p-3' style={{'maxHeight': '50vh','overflowY': 'scroll'}}>
                    <ul class="list-group users_group list-group-flush">
                        <AllUserlist 
                            data={search?(
                                    (allUsers).filter(item => ((item.userName).toLowerCase()).includes(search.toLowerCase()))
                                    ):allUsers 
                                }
                            profileView={profileView}
                            setProfileView={setProfileView}   
                             />
                    </ul>
                    </div>
                </div>
            </div>
            </div>
        </div>
        
        <div className="mt-5 p-2 bg-dark text-white text-center">
            <p>Made with <span className='hearts'>&#10084;</span> by Rhythm</p>
        </div>
        
    </div>    
    ):loader?
    <Navigate to='/home' />
    :<div>Loading ...</div>
  )
}

export default Dashboard