import React, { useState } from 'react'
import axios from '../api/axios';

const ModalEdit = (props) => {
    const [field,setField] = useState();
    const handleSubmit = async (e) => {
        console.log(e.target.value);
        const info = JSON.parse(localStorage.getItem('token'));
        const response = await axios.patch('/user',
            {"field_edit": props.field,"value": field},
         {
            headers: {
                "Authorization": `Bearer ${info.accessToken}`,
                "Content-type": "application/json"
            }
        }
        )
        console.log(response);
        props.setAuth(response.data)

    }

  return (
        <div className="modal fade" id="myModal" style={{'zIndex': '4'}}>
        <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
            <h4 className="modal-title">Edit {props.field}</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-outline">
                    <input type={props.field === 'age'? "number": "text"} id="field_edit" className="form-control" name="field_edit"
                    // ref={userRef}
                    autoComplete='off'
                    value={field}
                        onChange={(e) => setField(e.target.value)} required/>
                    <label className="form-label" htmlFor="field_edit">New {props.field}</label>
                </div>
                <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary btn-block mb col-md-3" data-bs-dismiss="modal">
                        Edit
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

export default ModalEdit
