import React, { useState } from 'react'
import axios from '../api/axios'
import { faWarning,faThumbsUp,faThumbsDown,faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ModalReport = ({sub,allPosts,setAllPosts,subdetails,item}) => {
    const [concern,setConcern] = useState('')
    const [reportText,setReportText] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const info = JSON.parse(localStorage.getItem('token'));
            if(info && info.accessToken)
            {
                const response = await axios.post('/SubGreddiiitPage/report', 
                {'reported_post': item._id,'reported_sub': item.posted_in,'concern': concern,'reportText': reportText,'reported_user': item.posted_by},
                {
                    headers: {
                        "Authorization": `Bearer ${info.accessToken}`,
                        'Content-type': 'application/json'
                    }
                }
                )
                setConcern('')
                setReportText('')
            }else{

            }
        }catch(err){
            console.log(err)
        }
    }
    const getSelectedText = ()=> {
      setReportText(window.getSelection().toString())
    }
  return (
    <div className="modal fade" id="myModal_report" style={{'zIndex': '4'}}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
            <div className="modal-header">
            <FontAwesomeIcon icon={faWarning} style={{'color': 'red'}} size='2x' />
            <h3 className="modal-title" style={{'color': 'red'}}>Report Post</h3>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
            <div className='post_report bg-light rounded'>
            <div className='d-flex flex-wrap'>
                {item.posted_by === subdetails.moderator?
                    <h5 className='m-2 flex-fill bg-warning rounded' style={{'color': 'red'}}>{item.posted_by}</h5>
                    :
                    <h5 className='m-2 flex-fill' style={{'color': 'red'}}>{item.posted_by}</h5>                                
                }
                <div className='p-2 m-1 rounded' style={{'width': '100%','backgroundColor': 'white','wordBreak': 'break-all','fontSize':'1rem','overflowY': 'scroll','minHeight': '100px','maxHeight': '200px','border': '1px solid black'}}
                onMouseUp = {() => getSelectedText()}
                >
                {item.content}
                </div>
                <div className='d-flex flex-wrap mt-1' style={{'width': '100%'}}>
                    <div className='ms-2 me-2 mt-0 mb-0'>
                        <FontAwesomeIcon icon={faThumbsUp} style={{'color': 'green'}} />
                        <span className="badge bg-danger">{item.upvotes.length >0?item.upvotes.length:0}</span>
                    </div>
                    <div className='ms-2 me-2 mt-0 mb-0'>
                        <FontAwesomeIcon icon={faThumbsDown} style={{'color': 'red'}} />
                        <span className="badge bg-danger">{item.downvotes.length >0?item.downvotes.length:0}</span>
                    </div>
                    <button type='button' className='btn btn-info ms-auto me-2'
                    >
                    <FontAwesomeIcon icon={faCommentAlt} size='1.5x' style={{'color': 'white'}}></FontAwesomeIcon>
                    <span className="badge bg-danger ms-1">{item.comments.length >0?item.comments.length:0}</span>
                    </button>
                </div>
                </div>
                </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-outline mb-2">
                    <h5 className="form-label" htmlFor="reportConcern">Concern</h5>
                    <textarea  id="reportConcern" className="form-control" name="concern"
                        placeholder='Concern' rows='1'
                    value={concern}
                    onChange={(e) => setConcern(e.target.value)} required/>
                </div>
                <div className="form-outline">
                    <h5 className="form-label" htmlFor="reportText">Text to Report</h5>
                    <textarea  id="reportText" className="form-control" name="textToReport"
                        placeholder='Select from the post above' rows='4' style={{'color': 'orange'}}
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)} required/>
                </div>
                <div className='d-flex justify-content-center m-3'>
                    <button type="submit" className="btn btn-success btn-block mb col-md-3" data-bs-dismiss="modal"
                    disabled={(concern.length >0 && reportText.length > 0)?"":"disabled"}
                    >
                    REPORT
                    </button>
                </div>
            </form>
            </div>

            <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>

        </div>
        </div>
        </div>
  )
}

export default ModalReport
