import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
 const {showAlert} = props
  const context = useContext(noteContext);
  const {notes,getAllNotes,editNote} = context;
let navigate = useNavigate();
 
  useEffect(()=>{
    if(localStorage.getItem('token')){ 
      getAllNotes();
    }else{
      navigate('/login');
    }
    // eslint-disable-next-line
  },[]);
  const ref =  useRef(null);
  const refClose =  useRef(null);
  
  const [note, setnote] = useState({id:'',etitle:'', edescription:'', etag:''}) 

  const updateNote =(currentNote)=>{
    ref.current.click();
    setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description, etag:currentNote.tag})
  }
  

  const handleClick = (e) => {
    console.log('updating the note', note) ;
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    showAlert('note updatedsuccessfully', 'success' )
    
  }
  const onChange = (e) => {
    setnote({...note, [e.target.name]: e.target.value})
  }
  

 
  return (
    <>
    <Addnote showAlert= {showAlert}/>
    
<button  ref={ref}type="button " className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  
  </button>
  
  <div className="modal fade foo2d-none " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog foo2  ">
      <div className="modal-content foo2 xxe  ">
        <div className="modal-header d-none">
          <h1 className="modal-title fs-5  d-none" id="exampleModalLabel">Modal title</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
         
         
        <div className="foo1">
      <form className='my-3  '>
  <div className="mb-3 ">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle"  name="etitle" value={note.etitle}aria-describedby="emailHelp" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
  </div>

  
</form>


  
  
        </div>
        </div>
        <div className="modal-footer ">
          <button ref={refClose} type="button" className="btn btn-secondary btttn" data-bs-dismiss="modal">Close</button>
          <button onClick={handleClick} type="button" className="btn btn-primary btttn">Update Note</button>
        </div>
      </div>
    </div>
  </div>
  <h2 className="vf">Your Notes</h2> 
  <div className="container ">
<div className="con">
  <div className="row my-3">
  
      {notes.map((note)=>{
        return <Noteitem showAlert={showAlert} key= {note._id}note={note} updateNote={updateNote} />;
      })}
    </div> 
    </div>
    </div>
    </>
  )
}

export default Notes
