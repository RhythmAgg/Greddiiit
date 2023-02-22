import React from 'react'
import Logo from '../img/reddit_logo.jpg'
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit } from '@fortawesome/free-brands-svg-icons'


const Login = () => {
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [usertaken,setUserTaken] = useState(null);
    const [passwordcorrect,setPasswordCorrect] = useState(null)

    const navigate = useNavigate();


    const userRef = useRef()

    const handleUserTaken = () => {
        setUserTaken('taken')
        setTimeout(() => {
            setUserTaken(null)
        },3000)
    }
    const handlePassCorrect = () => {
        setPasswordCorrect('incorrect')
        setTimeout(() => {
            setPasswordCorrect(null)
        },3000)
    }
    
    useEffect(() => {
        userRef.current.focus();

    },[])

    const handleSubmit = async (e) => {
        console.log('login')
        e.preventDefault();
        try{
        const response = await axios.post('/login',
            JSON.stringify({userName,password}),
            {
                headers:{
                    "Content-type": "application/json"
                },
                withCredentials: true
            }
            
        );
            console.log(JSON.stringify(response));
            localStorage.setItem('token',JSON.stringify(response.data));
            setUserName('');
            // setAge('');
            // setContact('');
            setPassword('');
            // setEmail('');
            userRef.current.focus();
            navigate('/');
        }catch(err){
            if(err.response.status === 409)
            {
                handleUserTaken();
                setUserName('')
                setPassword('')
                userRef.current.focus();
            }
            else if(err.response.status === 401)
            {
                handlePassCorrect('')
                setPassword('')
            }
        }
       
        // setUserName('');
        // setFirstName('');
        

    }

  return (
    <div className='Login' style={{'height': 'inherit'}}>
        <div className="card bg-glass" style={{opacity: 1}}>
            <div className="d-flex justify-content-center card-title">
            <FontAwesomeIcon icon={faReddit} size='3x' bounce />
                <h2 className='col-md-3 pt-2 '>Login</h2>
            </div>
            <div className="card-body px-4 py-5 px-md-5">
                <form onSubmit={handleSubmit}>

                    <div className="form-outline mb-4">
                        <input type="text" id="username_login" className="form-control" name="username"
                        ref={userRef}
                        autoComplete='off'
                        value={userName}
                            onChange={(e) => setUserName(e.target.value)} required/>
                        <label className="form-label" htmlFor="username_login">Username</label>
                        {usertaken && <div className="toast show bg-danger fade" style={{'width': '100%'}}>
                            <div className="toast-header">
                            <strong className="me-auto">Username Not Registered</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="toast"></button>
                            </div>
                        </div>
                        }
                    </div>


                    <div className="form-outline mb-4">
                        <input type="password" id="password_login" className="form-control" name="password" 
                        value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        <label className="form-label" htmlFor="password_login">Password</label>
                        {passwordcorrect && <div className="toast show bg-danger fade" style={{'width': '100%'}}>
                            <div className="toast-header">
                            <strong className="me-auto">Password Incorrect</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="toast"></button>
                            </div>
                        </div>
                        }
                    </div>

                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary btn-block mb col-md-6">
                        Login
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login
