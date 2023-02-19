import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios'
import { Link } from 'react-router-dom';
import Logo from '../img/reddit_logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit } from '@fortawesome/free-brands-svg-icons'
import { faBars,faAnglesUp,faSignOut, faUsers, faSquarePlus, faSearch, faAnglesDown} from '@fortawesome/free-solid-svg-icons'
import ModalEdit from './ModalEdit';
import ModalFollowers from './ModalFollowers';
import ModalFollowing from './ModalFollowing';
import AccordionSubPosts from './AccordionSubPosts';
import UserOffcanvas from './UserOffcanvas';
import Footer from './Footer';
import ModalCreatePost from './ModalCreatePost';
import SubOffCanvas from './SubOffCanvas';
import ModalReport from './ModalReport';

const SubGreddiiitPage = () => {
    const params = useParams()
    const [followersdata,setFollowersData] = useState([])
    const [followingdata,setFollowingData] = useState([])
    const [allUsers,setAllUsers] = useState([])
    const [auth,setAuth] = useState({});
    const [allSubGreddiiits, setAllSubGreddiiits] = useState([])
    const [search,setSearch] = useState('')
    const [sort,setSort] = useState([])
    const [tags,setTags] = useState('')
    const [original,setOriginal] = useState([])
    const [subdetails,setSubDetails] = useState({})
    const [postReport,setPostReport] = useState(null)

    const [allPosts, setAllPosts] = useState([])

    const [profileView,setProfileView] = useState(null)

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
                    const analytics = await axios.post('allSubGreddiiit/newvisitor',
                    {"sub": params.sub},
                    {
                        "headers": {
                            "Authorization": `Bearer ${info.accessToken}`,
                            "Content-type": "application/json"
                        }
                    }
                    )
                    setAllUsers(response_.data.user)
                    setFollowersData(x.data.followers);
                    setFollowingData(x.data.following);
                    setAllPosts(response.data.sub_posts)
                    setAllSubGreddiiits(response.data.sub_posts)
                    setSubDetails(response.data.result)
                    console.log('welcome')
                    setAuth(response.data.logged_in);
                    if(!response.data.result.followers.some(c => c.name === response.data.logged_in))
                    {
                        navigate('/AllSubGreddiiits')
                    }
                    setLoader('done')
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
  return ( 
    (loader && auth)?(
        <div className='row gx-0 '>
        <ModalCreatePost 
            sub={params.sub}
            allPosts={allPosts}
            setAllPosts={setAllPosts}
            subdetails={subdetails}
        />
        {postReport &&<ModalReport 
            sub={params.sub}
            allPosts={allPosts}
            setAllPosts={setAllPosts}
            subdetails={subdetails}
            item={postReport}
        />
        }
        {profileView && <UserOffcanvas data={allUsers} profileView={profileView} 
                followingdata={followingdata}
                setFollowingData={setFollowingData}  
                logged={auth}  
        />}
        <SubOffCanvas subdetails={subdetails} />
        <div className='col-lg-3 d-none d-lg-flex order-1 bg-dark  flex-column' style={{'color': 'white','rowGap': '1rem'}}>
            <img src={Logo} style={{'width': '100%','margin-bottom': '0'}} />
            <h1 className='text-center mb-2 mt-0 bg-warning' style={{'color': 'black','wordBreak': 'break-all'}}>{subdetails.name}</h1>
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
            <div className="row flex-fill gx-0" >
            <div className='col-lg-1'></div>
            <div className="col-lg-10 d-flex flex-fill flex-column followers flex-wrap" style={{'minHeight': '60vh'}}>
                <div className='d-lg-none p-2'>
                <FontAwesomeIcon icon={faBars} size='2x' data-bs-toggle='offcanvas'
                    data-bs-target='#subDetails'    
                />
                    <h3 className='m-2' style={{'display': 'inline'}} >Subgreddiiit Details</h3>
                </div>
                <div className='d-flex flex-wrap'>
                    {subdetails.followers.find(here => here.name === auth)
                    ?(
                    <div className='d-flex align-items-center justify-content-center flex-fill flex-wrap p-3  rounded'>
                        <FontAwesomeIcon icon={faSquarePlus} style={{'display': 'inline','cursor': 'pointer','color': 'green'}} 
                        size='3x' data-bs-toggle='modal' data-bs-target='#myModal_createpost' 
                        />
                        <h3 style={{'margin': '10px'}}>Create New Post</h3>
                    </div>
                    )
                    :<h3 className='text-center flex-fill' style={{'margin': '10px'}}>!Follow First for posting!</h3>
                    }
                </div>
                <div className='flex-fill p-4 d-flex flex-column bg-light'>
                    
                    <div className='flex-fill bg-white all_users p-0' style={{'minHeight': '50vh'}} >
                    {allPosts && <div id="accordion">
                        <AccordionSubPosts
                            data={[...allPosts].reverse()}  
                            allSubGreddiiits={allSubGreddiiits} 
                            setAllSubGreddiiits={setAllSubGreddiiits}
                            auth={auth}
                            profileView={profileView}
                            setProfileView={setProfileView} 
                            setAllPosts={setAllPosts}
                            allPosts={allPosts}
                            subdetails={subdetails}
                            postReport={postReport}
                            setPostReport={setPostReport}
                             />
                    </div>}
                    </div>
                </div>
            </div>
            <div className='col-lg-1'></div>

            </div>
        </div>
        
        <div className="mt-5 p-2 bg-dark text-white text-center">
            <p>Made with <span className='hearts'>&#10084;</span> by Rhythm</p>
        </div>
        
    </div>

    </div>    
    ):loader ?
    <Navigate to='/home' />
    :<div>Loading...</div>
  )
}

export default SubGreddiiitPage
