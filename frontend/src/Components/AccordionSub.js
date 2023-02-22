import React from 'react'
import { useState, useEffect,useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faAnglesDown, faAnglesRight,faAnglesUp  } from '@fortawesome/free-solid-svg-icons'
import axios from '../api/axios'
import { Link } from 'react-router-dom'

const AccordionSub = ({data,allMySubGreddiiits,setAllMySubGreddiiits,auth}) => {
    const [items,setItems] = useState([])
    const [changeIcon,setChangeIcon] = useState(null)
    useEffect(() => {
        const listItems = data
        setItems(listItems)
    },[data])

    let count='1';

    const handleDelete = async (name) => {
        try{
            const info = JSON.parse(localStorage.getItem('token'));
            const response = await axios.delete('/mySubGreddiiit',
            {
                headers:{
                    "Authorization": `Bearer ${info.accessToken}`,
                    "Content-type": "application/json"
                },
                data: {
                    'delete_subGreddiiit': name
                },
                withCredentials: true
            }
            );
            console.log(response);
            setAllMySubGreddiiits(allMySubGreddiiits.filter(it => it.name !== name))
        }catch(err){
            console.log(err)
        }
    }

  return (
    <>
    {items.map(item => {
        // if(item != 'admin'){
            count = (Number(count) + 1).toString()
            const x = 'A'+count
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
                        <FontAwesomeIcon className='mt-2' icon={faTrash} size='2x' style={{'cursor': 'pointer'}}
                            onClick = {() => handleDelete(item.name)}
                        />
                    </div>
                    <div id={x} className="collapse" data-bs-parent="#accordion">
                        <div className="card-body">
                        <div className='d-flex flex-wrap justify-content-around'>
                            <button type="button" className="btn btn-info m-2">
                            Users <span className="badge bg-danger">{item.followers.length}</span>
                            </button>
                            <button type="button" className="btn btn-info m-2">
                            Posts <span className="badge bg-danger">{item.posts.length}</span>
                            </button>
                            <div className=' d-flex justify-content-center'>
                            <Link to={`/MySubGreddiiitPage/${item.name}/${auth}`}>
                            <button type='button' className="btn btn-transparent user_button m-2" style={{'wordBreak': 'unset'}}>
                            Profile
                            <FontAwesomeIcon icon={faAnglesRight} />
                            </button>
                            </Link>
                            </div>
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

export default AccordionSub
