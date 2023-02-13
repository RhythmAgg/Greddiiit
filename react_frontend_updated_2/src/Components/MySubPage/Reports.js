import React from 'react'
import { useState } from 'react'
import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../api/axios'

const Reports = ({reports,setReports,subdetails,setSubDetails}) => {
    const [ignore,setIgnore] = useState('')
    let count = 0

    let map={};
    const interval_start = (item) => {
        document.getElementById(item._id).innerHTML = `Cancel in 3`
        let cou = 2
        map['interval_id'] = setInterval(() => {
            if(cou ===0)
            {
                handleBlock(item)
                document.getElementById(item._id).innerHTML = `Block User`
            }
            else{
                document.getElementById(item._id).innerHTML = `Cancel in ${cou}`
                cou--;
            }
        },1000)
        console.log(map['interval_id'])
    }

    const interval_end = (item) => {
        console.log(map['interval_id'])
        clearInterval(map['interval_id'])
        document.getElementById(item._id).innerHTML = `Block User`
        map = {}

    }


    const handleIgnore = async (item) => {
        setIgnore(`${item._id}`)
        const info = JSON.parse(localStorage.getItem('token'));
        const deleteReport = await axios.delete('/mySubGreddiiit/deleteReport',
            {
                headers:{
                    "Authorization": `Bearer ${info.accessToken}`,
                    "Content-type": "application/json"
                },
                data: {
                    'delete_report_id': item._id,
                    'reported_by': item.reported_by
                },
                withCredentials: true
            }
        );
    }
    const handleBlock = async (item) => {
        clearInterval(map['interval_id'])
        map={}
        const info = JSON.parse(localStorage.getItem('token'));
        const deleteReport = await axios.delete('/mySubGreddiiit/blockUser',
            {
                headers:{
                    "Authorization": `Bearer ${info.accessToken}`,
                    "Content-type": "application/json"
                },
                data: {
                    'delete_report_id': item._id,
                    'blockUser': item.reported_user,
                    'sub': item.reported_sub
                },
                withCredentials: true
            }
        );
        setReports(reports.filter(y => {
            return y._id !== item._id
        }))
        const temp = subdetails
        temp.followers = temp.followers.filter(x => {
            return x.name !== item.reported_user
        })
        setSubDetails(temp)
    }
    const handleDeletePost = async (item) => {
        const info = JSON.parse(localStorage.getItem('token'));
        const deleteReport = await axios.delete('/mySubGreddiiit/deleteReportPost',
            {
                headers:{
                    "Authorization": `Bearer ${info.accessToken}`,
                    "Content-type": "application/json"
                },
                data: {
                    'delete_report_id': item._id,
                    'delete_post_id': item.reported_post,
                    'sub_posted_in': item.reported_sub,
                    'reported_by': item.reported_by,
                    'reported_user': item.reported_user
                },
                withCredentials: true
            }
        );
        setReports(reports.filter(y => {
            return y._id !== item._id
        }))
    }
  return (
    <div className='reports-container'>
    {reports.map(item => {
        count++
       return (
        <div className="flex-item-left d-flex flex-column rounded" style={{'wordBreak': 'break-all'}}>
            <h3 className='text-center' style={{'color': 'red'}}>
                <FontAwesomeIcon icon={faWarning} />
                <span>Report #{count.toString()} </span>
            </h3>
            <div className="form-outline mb-2 pt-4" style={{'borderTop': '2px solid white'}}>
                <h6 className="form-label text-start" htmlFor="displayConcern"><strong>Concern</strong></h6>
                <div className='p-2 m-1 rounded text-start' style={{'width': '100%','backgroundColor': 'white','wordBreak': 'break-all','fontSize':'.8rem','overflowY': 'scroll','minHeight': '0px','maxHeight': '60px','border': '1px solid black'}}
                >{item.concern}
                </div>
            </div>
            <div className="form-outline mb-2 pb-4" style={{'borderBottom': '2px solid white'}}>
                <h6 className="form-label text-start" htmlFor="displayConcern"><strong>Reported Text</strong></h6>
                <div className='p-2 m-1 rounded text-start' style={{'width': '100%','backgroundColor': 'white','wordBreak': 'break-all','fontSize':'.8rem','overflowY': 'scroll','minHeight': '0px','maxHeight': '100px','border': '1px solid black'}}
                >{item.reportText}
                </div>
            </div>
            <div className='d-flex flex-wrap' style={{'columnGap': '5px'}}>
                <div className="form-outline flex-fill mb-2 pb-4" >
                    <h6 className="form-label text-start" htmlFor="displayConcern"><strong>Reported By</strong></h6>
                    <div className='p-2 m-1 rounded text-start' style={{'width': '100%','backgroundColor': 'white','color': 'green','wordBreak': 'break-all','fontSize':'1rem','overflowY': 'scroll','minHeight': '0px','maxHeight': '100px','border': '1px solid black'}}
                    >{item.reported_by}
                    </div>
                </div>
                <div className="form-outline flex-fill mb-2 pb-4" >
                <h6 className="form-label text-start" htmlFor="displayConcern"><strong>Reported User</strong></h6>
                    <div className='p-2 m-1 rounded text-start' style={{'width': '100%','backgroundColor': 'white','color': 'red','wordBreak': 'break-all','fontSize':'1rem','overflowY': 'scroll','minHeight': '0px','maxHeight': '100px','border': '1px solid black'}}
                    >{item.reported_user}
                    </div>
                </div>
            </div>
            <div className='d-flex flex-wrap justify-content-center'>
                <button type='button' className="btn btn-transparent bg-success m-1" style={{'padding': '5px'}}
                disabled={ignore === `${item._id}` ? "disabled":""} id={item._id}
                onClick={() => !map['interval_id']?interval_start(item):interval_end(item)}
                >Block User
                </button>
                <button type='button' className="btn btn-transparent bg-danger m-1" style={{'padding': '5px'}}
                disabled={ignore === `${item._id}` ? "disabled":""}
                onClick={() => handleDeletePost(item)}
                >Delete Post
                </button>
                <button type='button' className="btn btn-transparent bg-info m-1" style={{'padding': '5px'}}
                onClick={() => handleIgnore(item)}
                >Ignore
                </button>
            </div>
        </div>
       )
    })}
    </div>
  )
}

export default Reports
