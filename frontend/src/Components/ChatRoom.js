import React, { useCallback } from 'react'
import { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios'
import { Link } from 'react-router-dom';
import Logo from '../img/reddit_logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit } from '@fortawesome/free-brands-svg-icons'
import { faUser,faBars,faAnglesUp,faSignOut, faUsers, faSquarePlus, faSearch, faAnglesRight, faAnglesDown, faSadCry, faPerson, faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons'
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
import Message from './Message';
import ChatRoomOffCanvas from './ChatRoomOffcanvas';
import {io} from 'socket.io-client'

const ChatRoom = () => {
    const params = useParams()
    const [followersdata,setFollowersData] = useState([])
    const [followingdata,setFollowingData] = useState([])
    const [allUsers,setAllUsers] = useState([])
    const [auth,setAuth] = useState('');
    const [allSubGreddiiits, setAllSubGreddiiits] = useState([])
    const [search,setSearch] = useState('')
    const [reports,setReports] = useState([])
    const [request,setRequest] = useState([])
    const [subdetails,setSubDetails] = useState({})
    const [receiver,setReceiver] = useState('')

    const [newtext,setNewText] = useState('')

    const [messages,setMessages] = useState([])

    const [chatroom,setChatRoom] = useState({})
    const [validchat,setValidChat] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null);


    const [allPosts, setAllPosts] = useState([])

    const [profileView,setProfileView] = useState(null)

    const [nav,setNav] = useState('')

    const [friends,setFriends] = useState([])

    const [loader,setLoader] = useState(null)
   
    const navigate = useNavigate()
    const messageRef = useRef()

    const socket = useRef()

    const logout = (e) => {
        socket.current.disconnect();
        localStorage.removeItem('token');
        navigate('/home')
    }


    useEffect(() => {
        socket.current = io('http://localhost:3500');
        console.log(socket)
        socket.current.on("getMessage", (data) => {
            console.log('received')
            console.log(data)
            window.scrollTo(0, document.body.scrollHeight);
            setArrivalMessage({'sender': data.senderName,'text': data.text,'creation_time': data.creation_time})
            window.scrollTo(0, document.body.scrollHeight);
        });
    }, []);    

    useEffect(() => {
        if(arrivalMessage)
        {
            console.log('heheheheh')
            if(chatroom?.members.includes(arrivalMessage.sender))
            {
                console.log('yooo')
                window.scrollTo(0, document.body.scrollHeight);
                setMessages((prev) => [...prev, arrivalMessage]);
                console.log('yes')
                window.scrollTo(0, document.body.scrollHeight+60);

            }
        }    
    }, [arrivalMessage, chatroom]);

    useEffect(() => {
        (async () => {
            window.scrollTo(0,0)
            document.querySelector("html").style.height = '100vh';
            document.querySelector("body").style.height = '100vh';
            document.querySelector("body").setAttribute('onbeforeunload','handleback(event)')
            const info = JSON.parse(localStorage.getItem('token'));
            if(info && info.accessToken)
            {
                const response = await axios.get('/user/friends', {
                    "headers": {
                        "Authorization": `Bearer ${info.accessToken}` 
                    }
                }
                )
                console.log(response)
                setFriends(response.data.friend)
                setAuth(response.data.logged_in);
                setLoader('done')

            }else{
                setAuth(null);
                setLoader('done')
            }
        })()
    },[])
    useEffect(() => {
        socket.current.emit("addUser", auth);
        socket.current.on("getUsers", (users) => {
            console.log(users)
        //   setOnlineUsers(
        //     auth.followings.filter((f) => users.some((u) => u.userId === f))
        //   );
        });
    }, [auth]);

    const getChatRoom = async (friend) => {
        const info = JSON.parse(localStorage.getItem('token'));
            if(info && info.accessToken)
            {
                const response = await axios.post('/chat/getChatRoom', 
                {'friend': friend.name},
                {
                    "headers": {
                        "Authorization": `Bearer ${info.accessToken}` 
                    }
                }
                )
                console.log(response)
                if(response.data.chatroom.length === 0)
                {
                    setValidChat(friend.name)
                }else{
                    setValidChat('valid')
                    setReceiver(friend.name)
                    setChatRoom(response.data.chatroom[0])
                    console.log(response.data.chatroom[0].messages)
                    setMessages(response.data.chatroom[0].messages)
                    window.scrollTo(0, document.body.scrollHeight);

                }
            }
    }
    const createChatRoom = async (friend) => {
        const info = JSON.parse(localStorage.getItem('token'));
            if(info && info.accessToken)
            {
                const response = await axios.post('/chat/createChatRoom', 
                {'friend': friend},
                {
                    "headers": {
                        "Authorization": `Bearer ${info.accessToken}` 
                    }
                }
                )
                console.log(response)
                if(response.data.chatroom.length === 0)
                {
                    setValidChat(friend.name)
                }else{
                    setValidChat('valid')
                    setReceiver(friend.name)
                    setChatRoom(response.data.chatroom[0])
                    setMessages(response.data.chatroom[0].messages)
                    window.scrollTo(0, document.body.scrollHeight);
                }
            }
    }
    const sendMessage = async () => {
        const info = JSON.parse(localStorage.getItem('token'));
            if(info && info.accessToken)
            {
                const response = await axios.post('/chat/sendMessage', 
                {'text': newtext,'chat_id':chatroom._id},
                {
                    "headers": {
                        "Authorization": `Bearer ${info.accessToken}` 
                    }
                }
                )
                socket.current.emit("sendMessage", {
                    senderName: auth,
                    receiverName: receiver,
                    text: newtext,
                    creation_time: new Date()
                });
                console.log(response)
                setNewText('')
                window.scrollTo(0, document.body.scrollHeight);
                setMessages([...messages,response.data.message.messages.reverse()[0]])
                window.scrollTo(0, document.body.scrollHeight);

            }
    }

    return (
        loader === 'done' && auth
        ?
        <div className='row gx-0 '>
        <ChatRoomOffCanvas 
        search={search} 
        setSearch={setSearch} 
        friends={friends}
        getChatRoom={getChatRoom}
        />
        <div className='col-lg-3 d-none d-lg-flex order-1 bg-dark  flex-column' style={{'color': 'white','rowGap': '1rem'}}>
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
                        onClick={(e) => getChatRoom(x)}
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

        </div>
        <div className='col-lg-9 order-2' style={{'minHeight': '100vh','overflowY': 'scroll'}}>
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
                        <Link className="nav-link active" to="/ChatRoom">Chat Room</Link>
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
                    data-bs-target='#ChatRoomOffCanvas'    
                />
                    <h3 className='m-2' style={{'display': 'inline'}} >Friends</h3>
            </div>
            <div className="d-flex flex-fill flex-column followers flex-wrap" style={{'minHeight': '70vh'}}>
                {chatroom !== {} && validchat === 'valid'
                ?
                <div className='flex-fill p-3 d-flex flex-column bg-light m-2'>
                    <div className='flex-fill bg-white all_users p-3' style={{'minHeight': '60vh','overflowY': 'scroll'}}>
                    {messages.map(msg => {
                        return <Message message={msg} own={msg.sender === auth?true:false} />
                    })
                    }
                    </div>
                    <div className='d-flex'>
                        <textarea className='mt-2 me-2 rounded p-2 flex-fill' rows={1} value={newtext} onChange={(e) => setNewText(e.target.value)} 
                        placeholder='Send Message'
                        ref={messageRef}
                        />
                        <button className="btn btn-primary rounded pt-0" type="button" 
                        onClick={() => sendMessage()}
                        >
                        Send
                        </button>
                    </div>
                    <div className='d-flex justify-content-center mt-3'>
                    <button className='btn btn-primary rounded' onClick={() => window.scrollTo({top:0,left:0,behavior:'instant'})}
                    ><FontAwesomeIcon icon={faArrowUp} />
                    </button>
                    </div>
                </div>
                :validchat.length > 0
                ?
                <div className='mt-5'>
                    <h1 className='text-center'
                    ><FontAwesomeIcon icon={faUsers} style={{'color':'green','cursor': 'pointer'}} onClick={() => createChatRoom(validchat)} />
                    Open Conversation</h1>
                </div>
                :
                <div>
                    <h1 className='text-center'>Select a friend to Chat</h1>
                </div>
                }
                
            </div>

            </div>
        </div>
        
        <div className="mt-5 p-2 bg-dark text-white text-center" >
            <p>Made with <span className='hearts'>&#10084;</span> by Rhythm</p>
        </div>
        
    </div>

    </div>
    :loader?
    <Navigate to='/home' />
    :<div>Loading ...</div>
    )
}

export default ChatRoom
