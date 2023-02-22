import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from '../api/axios'
import { Link } from 'react-router-dom';
import Logo from '../img/reddit_logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit } from '@fortawesome/free-brands-svg-icons'
import { faAnglesUp,faSignOut, faUsers, faSquarePlus, faSearch, faAnglesDown} from '@fortawesome/free-solid-svg-icons'
import ModalEdit from './ModalEdit';
import ModalFollowers from './ModalFollowers';
import ModalFollowing from './ModalFollowing';
import AccordionAllSub from './AccordionAllSub';
import UserOffcanvas from './UserOffcanvas';
import Footer from './Footer';
import Fuse from 'fuse.js';

const AllSubGreddiiits = () => {
    const [auth,setAuth] = useState({});
    const [allSubGreddiiits, setAllSubGreddiiits] = useState([])
    const [search,setSearch] = useState('')
    const [sort,setSort] = useState([])
    const [tags,setTags] = useState('')
    const [original,setOriginal] = useState([])
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
                const response = await axios.get('/allSubGreddiiit', {
                    "headers": {
                        "Authorization": `Bearer ${info.accessToken}` 
                    }
                }
                )
                setOriginal(response.data.result)
                setAllSubGreddiiits(response.data.result)
                console.log('welcome')
                setAuth(response.data.logged_in);
                setLoader('done')
                
            }else{
                setAuth(null);
                setLoader('done')
            }
        })()
    },[])
    
    const handleSort = (e) => {
        if(e.target.checked){
            setSort([...sort,e.target.value])
        }else{
            setSort(sort.filter(item => item !== e.target.value))
        }
    }

    const applyFilters = () => {
        var filtered = [...original];
        console.log(filtered)
        console.log(original)
        const arrTags = tags.split(',')
        if(arrTags.length > 0 && arrTags[0] !== ''){
            console.log('ok')
            filtered = filtered.filter(item => {
                if(item.tags)
                {
                    for(let i=0;i<item.tags.length;i++)
                    {
                        if(arrTags.includes(item.tags[i])) return true
                        
                    }
                    return false
                }
                else return false
            })
        }
        if(sort){
            sort.forEach(item => {
                if(item === 'name(ASC)')
                {
                    filtered.sort((a,b) => {return (a.name.localeCompare(b.name))})
                }else if(item === 'name(DESC)')
                {
                    filtered.sort((a,b) => {return (b.name.localeCompare(a.name))})

                }else if(item === 'followers')
                {
                    filtered.sort((a,b) => {return (b.followers.length - a.followers.length)})

                }else{
                    filtered.reverse()
                }
            })
        }
        console.log(filtered)
        console.log(original)

        // setTags('')
        // setSort([])
        // document.getElementById('check1').checked = false;
        // document.getElementById('check2').checked = false;
        // document.getElementById('check3').checked = false;
        // document.getElementById('check4').checked = false;

        setAllSubGreddiiits(filtered)
    }

    const sortJoined = () => {
            const x = allSubGreddiiits.filter(item => item.followers.filter(w => w.name === auth).length > 0)
            const y = allSubGreddiiits.filter(w => !(x.includes(w)))
            console.log(x)
            console.log(y)
            return [...x,...y]
    }

    const fuseSearch = (sortJoined,search) => {
        let temp = []
        const options = {
            keys: ['name']
        }
        const fuse = new Fuse(sortJoined,options)
        const x = fuse.search(search)
        x.forEach(it => {
            temp.push(it.item)
        })
        return temp;
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
                        <Link className="nav-link " to="/">Profile Page</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/mySubGreddiiits">My Sub Greddiiits</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link active" to="/AllSubGreddiiits">Sub Greddiiits</Link>
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
            <div className="col-sm-4 add_subgreddiiit" style={{'minHeight': '50vh','position': 'relative'}}>
                <div className='d-flex align-items-center tt rounded' style={{'width': '100%','height': '100%'}}>
                <div className='d-flex justify-content-center flex-wrap' style={{'width': '100%'}}>
                <FontAwesomeIcon icon={faReddit} style={{'fontSize': '15rem','cursor': 'pointer','color': 'white'}} 
                    pulse   
                />
                </div>    
                </div>
            </div>
            <div className="col-sm-8 d-flex flex-column followers flex-wrap">
                <div className='d-flex flex-wrap'>
                    <div className='d-flex align-items-center justify-content-center flex-fill flex-wrap p-3 bg-warning rounded'>
                    <h3 style={{'margin': '5px'}}>SubGreddiiits Search</h3>
                    <FontAwesomeIcon icon={faSearch} style={{'display': 'inline','cursor': 'pointer','color': 'blue'}} size='2x'/>
                    </div>
                </div>
                <div className='flex-fill p-4 d-flex flex-column bg-light'>
                    <form className="d-flex mb-2" onSubmit={(e) => e.preventDefault() }>
                        <input className="form-control me-1" type="text" placeholder="Search SubGreddiiit Name" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}  
                        />
                        <button className="collapsed btn btn-primary" type="button" style={{'width': '20%'}} data-bs-toggle="collapse"
                            data-bs-target='#filters'
                        >
                        Filter<FontAwesomeIcon icon={faAnglesDown} />
                        </button>
                    </form>
                    <div className='collapse mb-2' id='filters'>
                        <div className='d-flex flex-column bg-info rounded p-2'>
                            <form className='mb-3'>
                            <div className="form-group d-flex">
                            <label htmlFor="tags_search" className='me-1'><strong>Tags:</strong></label>
                            <textarea className="form-control" rows="1" id="tags_search" placeholder="Separate by ','"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            ></textarea>
                            </div>
                            </form>
                            <form className='d-flex flex-wrap mb-3'>
                                <label className='me-1'><strong>Sort:</strong></label>
                                <div className='flex-fill d-flex justify-content-around flex-wrap'>
                                <div class="form-check ms-2 bg-warning rounded">
                                <div>
                                <span className="badge bg-danger">
                                Name(asc)
                                </span>
                                <input type="checkbox" class="form-check-input" id="check1" name="option1" 
                                    value="name(ASC)"
                                    onChange={(e) => handleSort(e)}
                                    />
                                </div>
                                </div>
                                <div class="form-check ms-2 bg-warning rounded">
                                <span className="badge bg-danger">
                                Name(desc)
                                </span>
                                <input type="checkbox" class="form-check-input" id="check2" name="option2"
                                value="name(DESC)"
                                onChange={(e) => handleSort(e)}
                                />
                                </div> <div class="form-check ms-2 bg-warning rounded">
                                <span className="badge bg-danger">
                                followers
                                </span>
                                <input type="checkbox" class="form-check-input" id="check3" name="option3" 
                                value="followers"
                                onChange={(e) => handleSort(e)}
                                />
                                </div> <div class="form-check ms-2 bg-warning rounded">
                                <span className="badge bg-danger">
                                Oldest
                                </span>
                                <input type="checkbox" class="form-check-input" id="check4" name="option4" 
                                value="date"
                                onChange={(e) => handleSort(e)}
                                />
                                </div>
                                </div>
                            </form>
                            <div className='d-flex justify-content-end'>
                                <button type='button' className='btn btn-success col-sm-3' data-bs-toggle='collapse'
                                    data-bs-target='#filters'
                                    onClick={() => applyFilters()}
                                >Apply</button>
                            </div>                        
                            </div>
                    </div>
                    <div className='flex-fill bg-white all_users p-3' style={{'maxHeight': '50vh','overflowY': 'scroll'}}>
                    {allSubGreddiiits && <div id="accordion">
                        <AccordionAllSub
                            data={search?(
                                    fuseSearch(sortJoined(),search)
                                    ):sortJoined()
                                }  
                            allSubGreddiiits={allSubGreddiiits} 
                            setAllSubGreddiiits={setAllSubGreddiiits}
                            original={original}
                            setOriginal={setOriginal}
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

export default AllSubGreddiiits
