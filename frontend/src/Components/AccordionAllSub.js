import React from 'react'
import { useState, useEffect,useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faAnglesDown, faAnglesRight,faAnglesUp, faPersonWalkingArrowRight, faDoorOpen} from '@fortawesome/free-solid-svg-icons'
import axios from '../api/axios'
import SubGreddiiitPage from './SubGreddiiitPage'
import { Link } from 'react-router-dom'

const AccordionAllSub = ({data,allSubGreddiiits,setAllSubGreddiiits,original,setOriginal,auth}) => {
    const [items,setItems] = useState([])
    const [changeIcon,setChangeIcon] = useState(null)
    useEffect(() => {
        console.log(data)
        const listItems = data
        setItems(listItems)
    },[data])

    let count='1';

    const joinRequest = async (sub) => {
        if(sub.leftBefore.includes(auth)){
            alert('Can\'t join cause you left before')
            return 0;
        }
        try{
            const info = JSON.parse(localStorage.getItem('token'));
            const response = await axios.patch('/allSubGreddiiit/joinRequest',
                {'name_sub': sub.name},
            {
                headers:{
                    "Authorization": `Bearer ${info.accessToken}`,
                    "Content-type": "application/json"
                }
            }
            );
            console.log(response);
            setAllSubGreddiiits(allSubGreddiiits.map(item => {
                var value = {...item}
                if(item.name === sub.name)
                {
                    value.requests.push(auth)
                    return value
                }else return {...item}
           }))
           setOriginal(original.map(item => {
            var value = {...item}
            if(item.name === sub.name)
            {
                value.requests.push(auth)
                return value
            }else return {...item}
       }))

        }catch(err){
            console.log(err)
        }
    }

    const leaveSub = async (name) => {
        try{
            const info = JSON.parse(localStorage.getItem('token'));
            const response = await axios.patch('/allSubGreddiiit/leaveSub',
                {'name_sub': name},
            {
                headers:{
                    "Authorization": `Bearer ${info.accessToken}`,
                    "Content-type": "application/json"
                }
            }
            );
            console.log(response);
            setAllSubGreddiiits(allSubGreddiiits.map(item => {
                var value = {...item}
                if(item.name === name)
                {
                    value.followers = [...value.followers.filter(cc => cc.name !== auth)]
                    value.leftBefore.push(auth)
                    return value
                }else return {...item}
           }))
           setOriginal(original.map(item => {
            var value = {...item}
            if(item.name === name)
            {
                value.followers = [...value.followers.filter(cc => cc.name !== auth)]
                value.leftBefore.push(auth)
                return value
            }else return {...item}
       }))

        }catch(err){
            console.log(err)
        }
    }

  return (
    <>
    {items.map(item => {
        // if(item != 'admin'){
            count = (Number(count) + 1).toString()
            const x = 'B'+count
            const y = "#" + x
            return(
                <div className="card bg-transparent" key={x}>
                    <div className="card-header d-flex">
                        <a className="collapsed btn flex-fill" data-bs-toggle="collapse" href={y}
                            style={{'display': 'block'}}
                            onClick = {() => changeIcon?setChangeIcon(null):setChangeIcon(y)}
                        >
                        <div style={{'maxWidth': '50vw','whiteSpace': 'nowrap','overflowX': 'scroll'}}>
                        <FontAwesomeIcon 
                        icon={changeIcon === y?faAnglesUp:faAnglesDown} 
                        size='2x' 
                        style={{'color': changeIcon === y?'red':'green'}} />
                        <h3 className='text-start' style={{'display': 'inline','margin': '10px'}}>{item.name}</h3>
                        </div>
                        </a>
                        {item.followers.filter(x => x.name === auth).length > 0 ?
                            <button type='button' className="btn btn-transparent leave_button m-2" style={{'wordBreak': 'unset','fontSize': '1.2rem'}}
                                disabled={item.moderator === auth ? "disabled": ""}
                                onClick = {() => leaveSub(item.name)}
                            >
                            <FontAwesomeIcon icon={faPersonWalkingArrowRight} style={{'fontSize': '1.5rem'}} />Leave
                            </button>
                            :
                            item.requests.includes(auth)
                            ?
                            <button type='button' className="btn btn-transparent user_button m-2" style={{'wordBreak': 'unset','fontSize': '1.2rem'}}
                                onClick={(e) => joinRequest(item)}
                                disabled
                            >
                            <FontAwesomeIcon icon={faDoorOpen} style={{'fontSize': '1.5rem'}}/>Request Sent
                            </button>
                            :
                            <button type='button' className="btn btn-transparent user_button m-2" style={{'wordBreak': 'unset','fontSize': '1.2rem'}}
                                onClick={(e) => joinRequest(item)}
                            >
                            <FontAwesomeIcon icon={faDoorOpen} style={{'fontSize': '1.5rem'}}/>Join
                            </button>
                            
                        }
                        
                    </div>
                    <div id={x} className="collapse" data-bs-parent="#accordion">
                        <div className="card-body">
                        <h5 className='text-center'>Moderator: <span className='bg-warning p-1 rounded'>{item.moderator}</span> </h5>
                        <div className='d-flex flex-wrap justify-content-around'>
                            <button type="button" className="btn btn-info m-2">
                            Users <span className="badge bg-danger">{item.followers.length}</span>
                            </button>
                            <button type="button" className="btn btn-info m-2">
                            Posts <span className="badge bg-danger">{item.posts.length}</span>
                            </button>
                            {item.followers.some(x => x.name === auth)
                            ?(
                                <div className='d-flex justify-content-center'>
                                <Link to={`/SubGreddiiitPage/${item.name}/${auth}`} target='_blank'>
                                <button type='button' className="btn btn-transparent user_button m-2" style={{'wordBreak': 'unset'}}
                                >
                                Profile
                                <FontAwesomeIcon icon={faAnglesRight} />
                                </button>
                                </Link>
                                </div>
                            )
                            :(
                                <div className='d-flex justify-content-center'>
                                <button type='button' className="btn btn-transparent user_button m-2" style={{'wordBreak': 'unset'}}
                                disabled
                                >
                                Follow First
                                <FontAwesomeIcon icon={faAnglesRight} />
                                </button>
                                </div>
                            )
                            }
                            
                        </div>
                        <h5 style={{'display': 'inline'}}>Tags: </h5>
                        {item.tags.map(word => {
                            return(
                            <span class="badge rounded-pill bg-success m-2" style={{'fontSize': '1rem'}}>{word}</span>
                            )
                        })}
                        <br></br>
                        <textarea className='rounded bg-transparent' value={item.description} rows='2'
                        style={{'width': '100%','padding': '1rem','border': '1px solid black'}} 
                        disabled 
                        />
                        <h5 style={{'display': 'inline'}}>Banned Keywords: </h5>
                        {item.bannedWords.map(word => {
                            return(
                            <span class="badge rounded-pill bg-danger m-2" style={{'fontSize': '1rem'}}>{word}</span>
                            )
                        })}
                        </div>
                    </div>
                </div>
            )
    })}
    </>
  )
}

export default AccordionAllSub
