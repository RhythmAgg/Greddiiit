import React from 'react'
import Logo from '../img/reddit_logo.jpg'
import { useState, useEffect, useRef } from 'react';
import axios from '../api/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit } from '@fortawesome/free-brands-svg-icons'

const Register = () => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [userName,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [age,setAge] = useState();
    const [contact,setContact] = useState();
    const [password,setPassword] = useState('');
    const [usertaken,setUserTaken] = useState(null);
    const [fieldsset,setFieldsSet] = useState(0);

    const registerRef = useRef()

    const handleUserTaken = () => {
        setUserTaken('taken')
        setTimeout(() => {
            setUserTaken(null)
        },3000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response = await axios.post('/register',
            JSON.stringify({firstName,lastName,userName,email,age,contact,password}),
            {
                headers:{
                    "Content-type": "application/json"
                },
                withCredentials: true
            }
            );
            console.log(JSON.stringify(response));
            setUserName('');
            setFirstName('');
            setLastName('');
            setAge('');
            setContact('');
            setPassword('');
            setEmail('');
            registerRef.current.focus();
        }catch(err){
            if(err.response.status === 409)
            {
                handleUserTaken();
                setUserName('')
            }
        }
    }

  return (
    <div className='Register' style={{'height': 'inherit','maxHeight': '80vh','overflowY': 'scroll'}}>
        <div className="card bg-glass" style={{opacity: 1}}>
            <div className="d-flex justify-content-center card-title">
            <FontAwesomeIcon icon={faReddit} size='3x' bounce />
                <h2 className='col-md-4  p-2'>Register</h2>
            </div>
            <div className="card-body px-4 py-5 px-md-5">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="form-outline">
                            <input type="text" id="fistname" className="form-control" name="first_name"
                                value={firstName} 
                                ref={registerRef}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                    setFieldsSet(1)
                                    }
                                }
                                required/>
                            <label className="form-label" htmlFor="firstname">First name</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="form-outline">
                            <input type="text" id="lastname" className="form-control"  name="last_name"
                            value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                    setFieldsSet(2)
                                }
                                } required />
                            <label className="form-label" htmlFor="lastname">Last name</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="text" id="username" className="form-control" name="username"
                        value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value)
                                setFieldsSet(3)
                            }
                        } required/>
                        <label className="form-label" htmlFor="username">Username</label>
                        {usertaken && <div className="toast show bg-danger fade" style={{'width': '100%'}}>
                            <div className="toast-header">
                            <strong className="me-auto">Username Taken</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="toast"></button>
                            </div>
                        </div>
                        }

                    </div>


                    <div className="form-outline mb-4">
                        <input type="email" id="email" className="form-control" name='email'
                        value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setFieldsSet(4)
                            }
                        } required/>
                        <label className="form-label" htmlFor="email">Email address</label>
                    </div>

                    <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="form-outline">
                        <input type="number" id="age" className="form-control" name="age" 
                        value={age}
                            onChange={(e) => {
                                setAge(e.target.value)
                                setFieldsSet(5)    
                            }
                        } required/>
                        <label className="form-label" htmlFor="age">Age</label>
                        </div>
                    </div>
                    <div className="col-md-8 mb-4">
                        <div className="form-outline">
                        <input type="tel" id="contact" className="form-control" name="contact" 
                        value={contact}
                            onChange={(e) => {
                                setContact(e.target.value)
                                setFieldsSet(6)
                                }
                            }
                            required/>
                        <label className="form-label" htmlFor="contact">Contact</label>
                        </div>
                    </div>
                </div>


                    <div className="form-outline mb-4">
                        <input type="password" id="password" className="form-control" name="password" 
                        value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setFieldsSet(7)
                                }
                            }/>
                        <label className="form-label" htmlFor="password">Password</label>
                    </div>

                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary btn-block mb col-md-6" 
                        disabled={fieldsset === 7 ? "": "disabled"}>
                        Register
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register
