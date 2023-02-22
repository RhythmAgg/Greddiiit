import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from '../api/axios'
import { Link } from 'react-router-dom';
import Logo from '../img/reddit_logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft,faSignOut, faUsers, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import ModalEdit from './ModalEdit';
import ModalFollowers from './ModalFollowers';
import ModalFollowing from './ModalFollowing';
import AccordionSub from './AccordionSub';
import UserOffcanvas from './UserOffcanvas';
import Footer from './Footer';

const MySubGreddiiits = () => {
    const [auth,setAuth] = useState({});
    const [followersdata,setFollowersData] = useState([])
    const [followingdata,setFollowingData] = useState([])
    const [allUsers,setAllUsers] = useState([])
    const [allMySubGreddiiits, setAllMySubGreddiiits] = useState([])
    const [edit,setEdit] = useState('');
    const [followers,setFollowers] = useState('');
    const [search,setSearch] = useState('')
    const [profileView,setProfileView] = useState(null)
    const [showForm,setShowForm] = useState('show')
    const [descSub,setDescSub] = useState('')
    const [nameSub,setNameSub] = useState('')
    const [tagsSub,setTagsSub] = useState('')
    const [bannedSub,setBannedSub] = useState('')
    const [nameTaken,setNameTaken] = useState('')
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
                const response = await axios.get('/mySubGreddiiit', {
                    headers: {
                        "Authorization": `Bearer ${info.accessToken}` 
                    }
                }
                )
                setAllMySubGreddiiits(response.data.result)
                setAuth(response.data.logged_in);
                setLoader('done')

            }else{
                setAuth(null);
                setLoader('done')
            }
        })()
    },[])

    const handleNameTaken = () => {
        setNameTaken('taken')
        setTimeout(() => {
            setNameTaken(null)
        },3000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const info = JSON.parse(localStorage.getItem('token'));
            const response = await axios.post('/mySubGreddiiit',
            JSON.stringify({nameSub,descSub,tagsSub,bannedSub}),
            {
                headers:{
                    "Authorization": `Bearer ${info.accessToken}`,
                    "Content-type": "application/json"
                },
                withCredentials: true
            }
            );
            console.log(response);
            setNameSub('');
            setDescSub('');
            setTagsSub('');
            setBannedSub('');
            setShowForm(null)
            setAllMySubGreddiiits([...allMySubGreddiiits,(response.data)])
        }catch(err){
            if(err.response.status === 409)
            {
                handleNameTaken();
                setNameSub('')
            }
        }
    }
    
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
    (loader && auth)?(
        <div>
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
                        <Link className="nav-link active" to="/mySubGreddiiits">My Sub Greddiiits</Link>
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
            <div className="col-sm-5 add_subgreddiiit" style={{'minHeight': '50vh','position': 'relative'}}>
                <div className='d-flex align-items-center' style={{'width': '100%','height': '100%'}}>
                <div className='d-flex justify-content-center flex-wrap' style={{'width': '100%'}}>
                <FontAwesomeIcon icon={faSquarePlus} style={{'display': 'inline','cursor': 'pointer','color': 'green'}} 
                    size='3x'
                    onClick={() => setShowForm('show')}    
                />
                <h2 style={{'margin': '10px'}}>Create Sub Greddiiit</h2>
                </div>
                
                </div>
                {showForm && <div class="card " style={{'position': 'absolute','top': '0','left': '0','width': '100%','height': '100%','overflowY': 'scroll'}}>
                <div class="card-header text-center p-3 bg-info d-flex ">
                    <FontAwesomeIcon icon={faArrowLeft} style={{'marginTop': ''}} size='2x' 
                        onClick={() => setShowForm(null)}    
                    />
                    <h5 className='flex-fill text-center'>Create a New Sub Greddiiit</h5>
                </div>
                <div class="card-body">
                    <form onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data'>
                    <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control mb-3" id="name" placeholder="name" required
                    value={nameSub}
                    onChange = {(e) => setNameSub(e.target.value)}
                    />
                    {nameTaken && <div className="toast show bg-danger fade" style={{'width': '100%'}}>
                            <div className="toast-header">
                            <strong className="me-auto">Name Taken</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="toast"></button>
                            </div>
                        </div>
                    }
                    </div>
                    <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea class="form-control mb-3" rows="3" id="description" placeholder='min(5-words)' required
                    value={descSub}
                    onChange = {(e) => setDescSub(e.target.value)}
                    ></textarea>
                    </div>
                    <div className="form-group">
                    <label htmlFor="tags">Tags:</label>
                    <textarea class="form-control mb-3" rows="1" id="tags" placeholder="Separate by ','"
                    value={tagsSub}
                    onChange = {(e) => setTagsSub(e.target.value)}
                    // defaultValue = ''
                    ></textarea>
                    </div>
                    <div className="form-group">
                    <label htmlFor="Banned">Banned Keywords</label>
                    <textarea class="form-control mb-5" rows="1" id="Banned" placeholder="Separate by ','"
                    value={bannedSub}
                    onChange = {(e) => setBannedSub(e.target.value)}
                    // defaultValue = ''
                    ></textarea>
                    </div>
                    <div className="form-group">
                    <label htmlFor="Banned">Image(.png, .jpeg, .jpg)</label>
                    <input class="form-control mb-5" id="image" type="file" accept='.jpg, .png, .jpeg' placeholder="Upload Image here"
                    />
                    </div>
                    <div className='d-flex justify-content-center'>
                    <button type="submit" className="btn btn-success" style={{'width': '50%','margin': 'auto'}}
                    // onClick={() => setShowForm(null)}
                    >Submit</button>
                    </div>
                </form>
                </div>
                </div>
                }
            </div>
            <div className="col-sm-7 d-flex flex-column followers flex-wrap">
                <div className='d-flex flex-wrap'>
                    <div className='d-flex align-items-center justify-content-center flex-fill flex-wrap p-3 bg-warning rounded'>
                    <FontAwesomeIcon icon={faReddit} style={{'display': 'inline','cursor': 'pointer','color': 'red'}} size='2x'/>
                    <h3 style={{'margin': '10px'}}>My Sub Greddiiits</h3>
                    </div>
                </div>
                <div className='flex-fill p-4 d-flex flex-column bg-light'>
                    <form className="d-flex mb-4">
                        <input className="form-control me-2" type="text" placeholder="Search SubGreddiiit Name" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}  
                        />
                        <button className="btn btn-primary" type="button" disabled>Search</button>
                    </form>
                    <div className='flex-fill bg-white all_users p-3' style={{'maxHeight': '50vh','overflowY': 'scroll'}}>
                    {allMySubGreddiiits && <div id="accordion">
                        <AccordionSub
                            data={search?(
                                    allMySubGreddiiits.filter(item => ((item.name).toLowerCase()).includes(search.toLowerCase()))
                                    ):allMySubGreddiiits
                                }  
                            allMySubGreddiiits={allMySubGreddiiits} 
                            setAllMySubGreddiiits={setAllMySubGreddiiits}
                            auth={auth}
                             />
                    </div>}
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

export default MySubGreddiiits
