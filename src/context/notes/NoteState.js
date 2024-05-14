import React, { useState } from 'react'
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitials =[];
  const [notes, setnotes] = useState(notesInitials);
   
  const getAllNotes =async()=>{
     //API CALL

     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",    
         headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
         },    
             });
    const json = await response.json();  
    console.log(json)
    setnotes(json);
 
  }


  const addNote =async(title,description,tag)=>{
     //API CALL

     const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",    
         headers: {
          "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
         },
             body: JSON.stringify({title,description,tag}),  
             });
    const json = await response.json();  
    console.log(json)

    setnotes(notes.concat(json));
  }


  const editNote =async(id,title,description,tag)=>{
    //API CALL

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",    
         headers: {
          "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
         },
             body: JSON.stringify({title,description,tag}),  
             });
    const json = await response.json();   
    console.log(json)

  //logic to edit in client
let newNotes = JSON.parse(JSON.stringify(notes));

  for(let index = 0; index <newNotes.length; index++) {
    const element = newNotes[index];
    if(element._id === id){
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
  }
  setnotes(newNotes);
  
    
  }
  const deleteNote =async(id)=>{
     //API CALL

     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",    
         headers: {
          "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
         },
             });
    const json = await response.json(); 
    console.log(json)

    //delete in client
    console.log('deleting the note',id);
    const newNote =notes.filter((note)=>{return note._id!==id;});
    setnotes(newNote);
  }
  return (
   <noteContext.Provider value={{notes,getAllNotes,addNote,editNote,deleteNote}}>
    {props.children}
   </noteContext.Provider>
  )
}

export default NoteState
